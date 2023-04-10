import { INodeProperties } from "n8n-workflow";
import { getAllTasksOperation, getAllTasksParameters } from "./TaskGetMany";
import { resourceTask } from "../../common/HabiticaNodeResources";
import { scoreTaskOperation, scoreTaskParameters } from './TaskScore.node';
import { createUserTaskOperation, createUserTaskParameters } from "./TaskCreateForUser";

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
const taskOperations : INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: getAllTasksOperation.value,
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				resourceTask.value,
			],
		},
	},
	options: [
		getAllTasksOperation,
		scoreTaskOperation,
		createUserTaskOperation,
	],
};

export const taskParameters: INodeProperties[] = [
	// operation
	taskOperations,

	// related parameters
	...getAllTasksParameters,
	...scoreTaskParameters,
	...createUserTaskParameters,
];
