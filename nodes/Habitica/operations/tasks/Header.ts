import { createUserTaskOperation, createUserTaskParameters } from "./functions/TaskCreateForUser";
import { resourceTask } from "./ResourceName";
import { getAllTasksOperation, getAllTasksParameters } from "./functions/TaskGetMany";
import { scoreTaskOperation, scoreTaskParameters } from "./functions/TaskScore.node";
import { IResourceDef } from "../common/CommonDefinitions";

export const taskResourceDefinitions: IResourceDef = {
	resource: resourceTask,
	operationDefs: [
		{
			operation: getAllTasksOperation,
			parameters: getAllTasksParameters,
		},
		{
			operation: scoreTaskOperation,
			parameters: scoreTaskParameters,
		},
		{
			operation: createUserTaskOperation,
			parameters: createUserTaskParameters,
		},
	],
};
