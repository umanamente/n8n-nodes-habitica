import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const scoreTaskOperation: INodePropertyOptions =
{
	name: 'Score Task',
	value: 'scoreTask',
	action: 'Score task',
	routing: {
		request: {
			method: 'POST',
			//url: '=tasks/{{$parameter.taskId}}/score/{{$parameter.directionUp ? "up" : "down"}}',
			url: '=tasks/{{$parameter.taskId}}/score/up',
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
				displayName: 'ID',
				name: 'id',
				type: 'string',
				hint: 'Enter a task ID',
				validation: [
					{
						type: 'regex',
						properties: {
							// "884046fa-bc7f-43e2-b1df-b202dc419dcf"
							regex: "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}",
							errorMessage: 'The ID must look like this: "884046fa-bc7f-43e2-b1df-b202dc419dcf"',
						},
					},
				],
				placeholder: '884046fa-bc7f-43e2-b1df-b202dc419dcf',
				// How to use the ID in API call
				url: '=http://api-base-url.com/?id={{$value}}'
			},
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					// You must always provide a search method
					// Write this method within the methods object in your base file
					// The method must populate the list, and handle searching if searchable: true
					searchListMethod: 'searchTasks',
					// If you want users to be able to search the list
					searchable: true,
					// Set to true if you want to force users to search
					// When true, users can't browse the list
					// Or false if users can browse a list
					searchFilterRequired: false
				}
			}
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

