import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const createUserTaskOperation: INodePropertyOptions =
{
	name: 'Create Task',
	value: 'createTask',
	action: 'Create Task',
	routing: {
		request: {
			method: 'POST',
			url: '=tasks/user',
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

export const createUserTaskParameters: INodeProperties[] = [
	// string: Task Caption (aka "text")
	{
		displayName: 'Task Caption',
		name: 'text',
		type: 'string',
		default: '',
		description: 'The text of the task',
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					createUserTaskOperation.value,
				]
			}
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			}
		},
	},
	{
		displayName: 'Task Type',
		name: 'type',
		type: 'options',
		default: 'habit',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Habit',
				value: 'habit',
			},
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Todo',
				value: 'todo',
			},
			{
				name: 'Reward',
				value: 'reward',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'task',
				],
				operation: [
					createUserTaskOperation.value,
				]
			}
		},
		routing: {
			send: {
				type: 'body',
				property: 'type',
			}
		},
	},
];

