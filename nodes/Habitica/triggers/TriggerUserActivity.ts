import { IDataObject, IHookFunctions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { IHabiticaTriggerBase } from "./Common";

export interface ITriggerUserActivity extends IHabiticaTriggerBase {
	/** field name for the webhook creation options */
	webhookOptionsField: string;
}

export class TriggerUserActivity implements ITriggerUserActivity {

	habiticaWebhookType: string;
	eventName: string;
	triggerDefinition: INodePropertyOptions;
	webhookOptionsField: string;

	constructor({triggerDefinition, webhookOptionsField }: {triggerDefinition: INodePropertyOptions, webhookOptionsField: string}) {
		this.habiticaWebhookType = "userActivity";
		this.eventName = triggerDefinition.value.toString();
		this.triggerDefinition = triggerDefinition;
		this.webhookOptionsField = webhookOptionsField;
	}

	updateBodyParamsForCreateWebhook = (body: IDataObject, hookFunctions: IHookFunctions): void => {
		const defaultOptions = {
			"petHatched": false,
			"mountRaised": false,
			"leveledUp": false,
			};
		body.options = {
			...defaultOptions,
			[this.webhookOptionsField]: true,
		};
	}
}

export const triggerUserPetHatched = new TriggerUserActivity({
	triggerDefinition: {
		name: 'Pet Hatched',
		value: 'petHatched',
	},
	webhookOptionsField: 'petHatched',
});

export const triggerUserMountRaised = new TriggerUserActivity({
	triggerDefinition: {
		name: 'Mount Raised',
		value: 'mountRaised',
	},
	webhookOptionsField: 'mountRaised',
});

export const triggerUserLeveledUp = new TriggerUserActivity({
	triggerDefinition: {
		name: 'Leveled Up',
		value: 'leveledUp',
	},
	webhookOptionsField: 'leveledUp',
});

export const triggerUserActivityParameters: INodeProperties[] = [
	// no parameters
];
