import { IDataObject, ILoadOptionsFunctions, INodeListSearchResult, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { getAllTasksOperation, getAllTasksParameters } from './operations/GetTasks.node';
import { scoreTaskOperation, scoreTaskParameters } from './operations/ScoreTask.node';
import { habiticaApiRequest } from './operations/Common';

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
						name: 'Blaggaa',
						value: 'blaha',
					},
				],
				default: 'task',
			},
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: getAllTasksOperation.value,
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'task',
						],
					},
				},
				options: [
					getAllTasksOperation,
					scoreTaskOperation
				],
			},
			...getAllTasksParameters,
			...scoreTaskParameters,
		],
	};

	methods = {
		listSearch: {
			async searchTasks(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				this.logger.debug('searchTasks called');
				const tasks = await habiticaApiRequest.call(this, 'GET', 'tasks/user');
				this.logger.debug('tasks: ' + JSON.stringify(tasks));
				return {
					results: tasks.map((task: IDataObject) => ({
						name: task.text,
						value: task.id,
					})),
				};
			},
		},
		loadOptions: {
			async getTasks(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				/*const tasks = await habiticaApiRequest.call(this, 'POST', 'tasks/user');
				sdLogger.debug('tasks: ' + JSON.stringify(tasks));
				for (const task of tasks) {
					const taskDisplayName = task.text;
					const taskId = task.id;

					returnData.push({
						name: taskDisplayName,
						value: taskId,
					});
				}*/
				returnData.push({
					name: "Frst task",
					value: "first task id",
				});
				returnData.push({
					name: "Second task",
					value: "second task id",
				});

				return returnData;
			},
		},
	};
}
