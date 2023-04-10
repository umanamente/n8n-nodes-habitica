import { INodeProperties } from "n8n-workflow";
import { cronRunOperation, cronRunParameters } from "./CronRun";
import { resourceCron } from "../../common/HabiticaNodeResources";

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
const cronOperations : INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: cronRunOperation.value,
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				resourceCron.value,
			],
		},
	},
	options: [
		cronRunOperation
	],
};

export const cronParameters: INodeProperties[] = [
	// operation
	cronOperations,

	// related parameters
	...cronRunParameters,
];
