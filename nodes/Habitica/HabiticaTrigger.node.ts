import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { habiticaApiRequest } from './common/HabiticaApiRequest';
import { triggerTaskActivityParameters, triggerTaskScored } from './triggers/TriggerTaskActivity';
import { allEventDefinitions } from './triggers/Common';
import { searchTasks } from './parameters/ParameterSelectTask';
import { triggerGroupChatMessageReceivedParameters } from './triggers/TriggerGroupChat';
import { searchGroups } from './parameters/ParameterSelectGroup';
import { triggerQuestActivityParameters } from './triggers/TriggerQuestActivity';
import { triggerUserActivityParameters } from './triggers/TriggerUserActivity';


export class HabiticaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Habitica Trigger',
		name: 'habiticaTrigger',
		icon: 'file:habitica-icon.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Habitica events via webhooks',
		defaults: {
			name: 'Habitica Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'habiticaApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: triggerTaskScored.triggerDefinition.value,
				options: [
					...Object.values(allEventDefinitions).map(eventDefinition => eventDefinition.triggerDefinition),
				],
			},
			...triggerTaskActivityParameters,
			...triggerGroupChatMessageReceivedParameters,
			...triggerQuestActivityParameters,
			...triggerUserActivityParameters
		],
	};

	methods = {
		listSearch: {
			searchTasks: searchTasks,
			searchGroups: searchGroups,
		},
	}

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// check that this webhook is already registered in Habitica
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');

				const registeredWebhooks = await habiticaApiRequest.call(this, 'GET', 'user/webhook');
				for (const webhook of registeredWebhooks) {
					if (webhook.url === webhookUrl) {
						webhookData.webhookId = webhook.id;
						return true;
					}
				}
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// register this webhook in Habitica
				const event = this.getNodeParameter('event') as string;

				if (!(event in allEventDefinitions)) {
					throw new NodeOperationError(this.getNode(), 'Event "' + event + '" is not supported. Contact the developer.');
				}
				const eventDefinition = allEventDefinitions[event];

				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				this.logger.debug('create webhook for event: ' + event);


				var body: IDataObject = {
					url: webhookUrl,
					label: "N8N: " + event,
					type: eventDefinition.habiticaWebhookType,
				};

				if (eventDefinition.updateBodyParamsForCreateWebhook) {
					eventDefinition.updateBodyParamsForCreateWebhook(body, this);
				}

				this.logger.debug('create webhook body: ' + JSON.stringify(body));

				const createWebhookResponse = await habiticaApiRequest.call(this, 'POST', 'user/webhook', body);
				this.logger.debug('createWebhookResponse: ' + JSON.stringify(createWebhookResponse));
				webhookData.webhookId = createWebhookResponse.id;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// unregister this webhook in Habitica
				const webhookId = this.getWorkflowStaticData('node').webhookId;
				const deleteWebhookResponse = await habiticaApiRequest.call(this, 'DELETE', `user/webhook/${webhookId}`);
				this.logger.debug('deleteWebhookResponse: ' + JSON.stringify(deleteWebhookResponse));
				return true;
			},
		},
	};




	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();

		this.logger.debug('Received webhook: ' + JSON.stringify(req.body));

		const event = this.getNodeParameter('event') as string;
		if (!(event in allEventDefinitions)) {
			// this should never happen, because the event is already checked in the create webhook method
			// filter out unsupported events
			this.logger.error('Webhook is attached to an unsupported event: ' + event);
			return {
				noWebhookResponse: true,
			};
		}
		this.logger.debug('Event: ' + event);

		const eventDefinition = allEventDefinitions[event];
		if (eventDefinition.habiticaWebhookType === 'taskActivity') {
			// check filter
			const allowAllTasks = this.getNodeParameter('allowAllTasks', true) as boolean;
			this.logger.debug('allowAllTasks: ' + allowAllTasks);
			if (!allowAllTasks) {
				// check if the task id is in the list of allowed tasks
				const requiredTaskId = this.getNodeParameter('taskId', "<unknown>", {extractValue: true}) as string;
				this.logger.debug('requiredTaskId: ' + requiredTaskId);

				const receivedTaskId = req.body.task.id;
				this.logger.debug('receivedTaskId: ' + receivedTaskId);

				if (requiredTaskId !== receivedTaskId) {
					this.logger.debug('Task id does not match. Skip this webhook.');
					return {
						noWebhookResponse: true,
					};
				} else {
					this.logger.debug('Task id matches. Accept this webhook.');
				}
			}
		}

		this.logger.debug('Webhook received: ' + JSON.stringify(req.body));
		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject)],
		};
	}
}
