import { IResourceDef } from "../common/CommonDefinitions";
import { resourceContent } from "./ResourceName";
import { getAllContentObjectsOperation, getAllContentObjectsParameters } from "./functions/ContentGetAllObjects";
import { getGameWorldStateOperation, getGameWorldStateParameters } from "./functions/ContentGetWorldState";

export const contentResourceDefinitions: IResourceDef = {
	resource: resourceContent,
	operationDefs: [
		{
			operation: getAllContentObjectsOperation,
			parameters: getAllContentObjectsParameters,
		},
		{
			operation: getGameWorldStateOperation,
			parameters: getGameWorldStateParameters,
		}
	],
};


