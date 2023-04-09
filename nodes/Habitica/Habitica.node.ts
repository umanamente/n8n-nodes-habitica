import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class Habitica implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Habitica',
		name: 'habitica',
		icon: 'file:habitica-icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Habitica API',
		defaults: {
			name: 'Habitica',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'habiticaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://habitica.com/api/v3/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Blaha',
						value: 'blaha',
					},
				],
				default: 'task',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'task',
						],
					},
				},
				options: [
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
					},
				],
				default: 'getAll',
			},
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

		],

	};

}
