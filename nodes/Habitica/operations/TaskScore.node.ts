import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

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
	{
		displayName: 'Task',
		name: 'taskId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		description: 'Select a task to score',
		required: true,
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchTasks',
					searchable: false,
					searchFilterRequired: false
				}
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				hint: 'Enter a task ID',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}",
							errorMessage: 'The ID must look like this: "884046fa-bc7f-43e2-b1df-b202dc419dcf"',
						},
					},
				],
				placeholder: '884046fa-bc7f-43e2-b1df-b202dc419dcf',
			},
		],
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

