import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectTask } from "../parameters/ParameterSelectTask";

export const scoreTaskOperation: INodePropertyOptions =
{
	name: 'Score Task',
	value: 'scoreTask',
	action: 'Score task',
	routing: {
		request: {
			method: 'POST',
			url: '=tasks/{{$parameter.taskId}}/score/{{$parameter.directionUp ? "up" : "down"}}',
		},
		output: {
			postReceive: [
				// response is in "data" property
				{
					type: 'rootProperty',
					properties: {
						property: 'data',
					},
				},

			],
		},
	},
};

export const scoreTaskParameters: INodeProperties[] = [
	// select task
	{
		...parameterSelectTask,
		description: 'The task to score',
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					scoreTaskOperation.value,
				]
			}
		},
	},
	// boolean field: up or down
	{
		displayName: 'Direction "Up"',
		name: 'directionUp',
		type: 'boolean',
		default: true,
		description: 'Whether to score the task up or down',
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					scoreTaskOperation.value,
				]
			}
		},
	},


];

