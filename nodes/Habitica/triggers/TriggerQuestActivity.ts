import { IDataObject, IHookFunctions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { IHabiticaTriggerBase } from "./Common";

export interface ITriggerQuestActivity extends IHabiticaTriggerBase {
	/** field name for the webhook creation options */
	webhookOptionsField: string;
}

export class TriggerQuestActivity implements ITriggerQuestActivity {

	habiticaWebhookType: string;
	eventName: string;
	triggerDefinition: INodePropertyOptions;
	webhookOptionsField: string;

	constructor({triggerDefinition, webhookOptionsField }: {triggerDefinition: INodePropertyOptions, webhookOptionsField: string}) {
		this.habiticaWebhookType = "questActivity";
		this.eventName = triggerDefinition.value.toString();
		this.triggerDefinition = triggerDefinition;
		this.webhookOptionsField = webhookOptionsField;
	}

	updateBodyParamsForCreateWebhook = (body: IDataObject, hookFunctions: IHookFunctions): void => {
		const defaultOptions = {
			"questStarted": false,
			"questFinished": false,
			"questInvited": false,
		};
		body.options = {
			...defaultOptions,
			[this.webhookOptionsField]: true,
		};
	}
}

export const triggerQuestStarted = new TriggerQuestActivity({
	triggerDefinition: {
		name: 'Quest Started',
		value: 'questStarted',
	},
	webhookOptionsField: 'questStarted',
});

export const triggerQuestFinished = new TriggerQuestActivity({
	triggerDefinition: {
		name: 'Quest Finished',
		value: 'questFinished',
	},
	webhookOptionsField: 'questFinished',
});

export const triggerQuestInvited = new TriggerQuestActivity({
	triggerDefinition: {
		name: 'Quest Invited',
		value: 'questInvited',
	},
	webhookOptionsField: 'questInvited',
});


export const triggerQuestActivityParameters: INodeProperties[] = [
	// no parameters
];

