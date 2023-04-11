import { IDataObject, INodePropertyOptions } from "n8n-workflow";
import { triggerTaskScored, triggerTaskCreated, triggerTaskDeleted, triggerTaskUpdated } from './TriggerTaskActivity';

export interface IHabiticaTriggerBase {
	/** n8n internal event name */
	eventName: string;

	/** habitica webhook type name: "taskActivity", "groupChatReceived", "userActivity", "questActivity" */
	habiticaWebhookType: string;

	/** trigger definition for n8n trigger node */
	triggerDefinition: INodePropertyOptions;

	/** method for updating body parameters for "create webhook" request */
	updateBodyParamsForCreateWebhook?(body: IDataObject): void;
};

// dictionary of all event definitions
export const allEventDefinitions: {[key: string]: IHabiticaTriggerBase} = {
	// task activity
	[triggerTaskScored.eventName]: triggerTaskScored,
	[triggerTaskCreated.eventName]: triggerTaskCreated,
	[triggerTaskUpdated.eventName]: triggerTaskUpdated,
	[triggerTaskDeleted.eventName]: triggerTaskDeleted,
};
