import { IDataObject, ILoadOptionsFunctions, INodeListSearchResult, INodeProperties } from "n8n-workflow";
import { habiticaApiRequest } from "../common/HabiticaApiRequest";
import { validationGuidRegex } from "./Common";
import { AUTHOR_ID } from "../../../credentials/HabiticaApi.credentials";


// searchTasks
export async function searchTasks(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	const tasks = await habiticaApiRequest.call(this, 'GET', 'tasks/user');
	this.logger.debug("Loaded " + tasks.length + " tasks");
	return {
		results: tasks.map((task: IDataObject) => ({
			name: task.text,
			value: task.id,
		})),
	};
}


/**
 * base parameter for selecting a task
 */
export const parameterSelectTask: INodeProperties	= {
	displayName: 'Task',
	name: 'taskId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	description: 'Select a task',
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
				validationGuidRegex,
			],
			placeholder: AUTHOR_ID,
		},
	],
};
