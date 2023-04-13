import { IResourceDef } from "../common/CommonDefinitions";
import { resourceQuest } from "./ResourceName";
import { acceptQuestOperation, acceptQuestParameters } from "./functions/QuestAccept";

export const questResourceDefinitions: IResourceDef = {
	resource: resourceQuest,
	operationDefs: [
		{
			operation: acceptQuestOperation,
			parameters: acceptQuestParameters,
		},
	],
};


