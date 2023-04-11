import { IDataObject, IHookFunctions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { IHabiticaTriggerBase } from "./Common";
import { parameterSelectTask } from "../parameters/ParameterSelectTask";

export interface ITriggerTaskActivity extends IHabiticaTriggerBase {
	/** field name for the webhook creation options */
	webhookOptionsField: string;
}

export class TriggerTaskActivity implements ITriggerTaskActivity {

	habiticaWebhookType: string;
	eventName: string;
	triggerDefinition: INodePropertyOptions;
	webhookOptionsField: string;

	constructor({triggerDefinition, webhookOptionsField }: {triggerDefinition: INodePropertyOptions, webhookOptionsField: string}) {
		this.habiticaWebhookType = "taskActivity";
		this.eventName = triggerDefinition.value.toString();
		this.triggerDefinition = triggerDefinition;
		this.webhookOptionsField = webhookOptionsField;
	}

	updateBodyParamsForCreateWebhook = (body: IDataObject, hookFunctions: IHookFunctions): void => {
		const defaultOptions = {
			created: false,
			updated: false,
			deleted: false,
			scored: false,
		};
		body.options = {
			...defaultOptions,
			[this.webhookOptionsField]: true,
		};
	}
}

export const triggerTaskScored = new TriggerTaskActivity({
	triggerDefinition: {
		name: 'Task Scored',
		value: 'taskScored',
	},
	webhookOptionsField: 'scored',
});


export const triggerTaskCreated = new TriggerTaskActivity({
	triggerDefinition: {
		name: 'Task Created',
		value: 'taskCreated',
	},
	webhookOptionsField: 'created',
});

export const triggerTaskUpdated = new TriggerTaskActivity({
	triggerDefinition: {
		name: 'Task Updated',
		value: 'taskUpdated',
	},
	webhookOptionsField: 'updated',
});

export const triggerTaskDeleted = new TriggerTaskActivity({
	triggerDefinition: {
		name: 'Task Deleted',
		value: 'taskDeleted',
	},
	webhookOptionsField: 'deleted',
});

export const triggerTaskActivityParameters: INodeProperties[] = [
	{
		displayName: 'All Tasks',
		name: 'allowAllTasks',
		type: 'boolean',
		default: true,
		description: 'Whether receive webhooks for all tasks or only for the specified task ID',
		displayOptions: {
			show: {
				event: [
					//triggerTaskCreated.eventName, // no filters for created tasks
					triggerTaskUpdated.eventName,
					triggerTaskDeleted.eventName,
					triggerTaskScored.eventName,
				],
			},
		},
	},
	// show select task menu if "All Tasks" is false

	{
		...parameterSelectTask,
		displayOptions: {
			show: {
				allowAllTasks: [
					false,
				],
				event: [
					triggerTaskUpdated.eventName,
					triggerTaskDeleted.eventName,
					triggerTaskScored.eventName,
				],
			},
		},
		description: 'Trigger will only fire for the specified task ID',
	},
];
