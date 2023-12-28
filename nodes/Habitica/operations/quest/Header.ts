import { IResourceDef } from "../common/CommonDefinitions";
import { resourceQuest } from "./ResourceName";
import { acceptQuestOperation, acceptQuestParameters } from "./functions/QuestAccept";
import { questForceStartOperation, questForceStartParameters } from "./functions/QuestForceStart";
import { questInviteOperation, questInviteParameters } from "./functions/QuestInvite";

export const questResourceDefinitions: IResourceDef = {
	resource: resourceQuest,
	operationDefs: [
		{
			operation: acceptQuestOperation,
			parameters: acceptQuestParameters,
		},
		{
			operation: questForceStartOperation,
			parameters: questForceStartParameters,
		},
		{
			operation: questInviteOperation,
			parameters: questInviteParameters,
		},
	],
};


