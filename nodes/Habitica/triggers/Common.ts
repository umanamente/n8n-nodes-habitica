import { IDataObject, IHookFunctions, INodePropertyOptions } from "n8n-workflow";
import { triggerTaskScored, triggerTaskCreated, triggerTaskDeleted, triggerTaskUpdated } from './TriggerTaskActivity';
import { triggerGroupChatMessageReceived } from "./TriggerGroupChat";
import { triggerQuestFinished, triggerQuestInvited, triggerQuestStarted } from "./TriggerQuestActivity";
import { triggerUserPetHatched, triggerUserMountRaised, triggerUserLeveledUp } from "./TriggerUserActivity";

export interface IHabiticaTriggerBase {
	/** n8n internal event name */
	eventName: string;

	/** habitica webhook type name: "taskActivity", "groupChatReceived", "userActivity", "questActivity" */
	habiticaWebhookType: string;

	/** trigger definition for n8n trigger node */
	triggerDefinition: INodePropertyOptions;

	/** method for updating body parameters for "create webhook" request */
	updateBodyParamsForCreateWebhook?(body: IDataObject, hookFunctions: IHookFunctions): void;
};

// dictionary of all event definitions
export const allEventDefinitions: {[key: string]: IHabiticaTriggerBase} = {
	// task activity
	[triggerTaskScored.eventName]: triggerTaskScored,
	[triggerTaskCreated.eventName]: triggerTaskCreated,
	[triggerTaskUpdated.eventName]: triggerTaskUpdated,
	[triggerTaskDeleted.eventName]: triggerTaskDeleted,
	// group chat
	[triggerGroupChatMessageReceived.eventName]: triggerGroupChatMessageReceived,
	// quest activity
	[triggerQuestStarted.eventName]: triggerQuestStarted,
	[triggerQuestFinished.eventName]: triggerQuestFinished,
	[triggerQuestInvited.eventName]: triggerQuestInvited,
	// user activity
	[triggerUserPetHatched.eventName]: triggerUserPetHatched,
	[triggerUserMountRaised.eventName]: triggerUserMountRaised,
	[triggerUserLeveledUp.eventName]: triggerUserLeveledUp,
};
