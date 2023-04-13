import { cronRunOperation, cronRunParameters } from "./functions/CronRun";
import { resourceCron } from "./ResourceName";
import { IResourceDef } from "../common/CommonDefinitions";

export const cronResourceDefinitions: IResourceDef = {
	resource: resourceCron,
	operationDefs: [
		{
			operation: cronRunOperation,
			parameters: cronRunParameters,
		},
	],
};
