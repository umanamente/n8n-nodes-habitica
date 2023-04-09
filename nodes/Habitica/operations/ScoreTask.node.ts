import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const scoreTaskOperation: INodePropertyOptions =
{
	name: 'Score Task',
	value: 'scoreTask',
	action: 'Score task',
	routing: {
		request: {
			method: 'GET',
			url: '=tasks/user',
		},
		output: {
			postReceive: [
				// tasks are in "data" property
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
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		description: 'ID of the task to score',
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					'scoreTask',
				]
			}
		},
	},


];
