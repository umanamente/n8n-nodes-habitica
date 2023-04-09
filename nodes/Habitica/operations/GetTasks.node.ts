import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const getAllTasksOperation: INodePropertyOptions =
{
	name: 'Get Many',
	value: 'getAll',
	action: 'Get many tasks',
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

export const getAllTasksParameters: INodeProperties[] = [
	{
		displayName: 'All Types of Tasks',
		name: 'allTypes',
		type: 'boolean',
		default: true,
		description: 'Whether to get all types: daily, todo, habit and rewards tasks',
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					'getAll',
				]
			}
		},
	},
	{
		displayName: 'Task Type',
		name: 'taskType',
		type: 'options',
		placeholder: 'All tasks',
		default: 'habits',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Habits',
				value: 'habits',
			},
			{
				name: 'Dailys',
				value: 'dailys',
			},
			{
				name: 'Todos',
				value: 'todos',
			},
			{
				name: 'Rewards',
				value: 'rewards',
			},
			{
				name: 'Completed Todos',
				value: 'completedTodos',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					'getAll',
				]
			},
			hide: {
				allTypes: [
					true,
				],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'type',
			}
		},
	},


];
