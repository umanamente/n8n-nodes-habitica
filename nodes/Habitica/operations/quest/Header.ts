import { IResourceDef } from "../common/CommonDefinitions";
import { resourceQuest } from "./ResourceName";
import { acceptQuestOperation, acceptQuestParameters } from "./functions/QuestAccept";
import { questForceStartOperation, questForceStartParameters } from "./functions/QuestForceStart";

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
	],
};


