import { INodeProperties } from "n8n-workflow";

export const paramtereSelectTask: INodeProperties	= {
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
};
