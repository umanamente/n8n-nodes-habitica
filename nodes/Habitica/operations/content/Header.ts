import { IResourceDef } from "../common/CommonDefinitions";
import { resourceContent } from "./ResourceName";
import { getAllContentObjectsOperation, getAllContentObjectsParameters } from "./functions/ContentGetAllObjects";

export const contentResourceDefinitions: IResourceDef = {
	resource: resourceContent,
	operationDefs: [
		{
			operation: getAllContentObjectsOperation,
			parameters: getAllContentObjectsParameters,
		}
	],
};


