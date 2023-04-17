import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectTask } from "../../../parameters/ParameterSelectTask";
import { resourceTask } from "../ResourceName";

export const scoreTaskChecklistItemOperation: INodePropertyOptions =
{
	name: "Score Checklist Item",
	value: "scoreTaskChecklistItem",
	action: "Score Checklist Item",
	routing: {
		request: {
			method: 'POST',
			url: '=tasks/{{$parameter.taskId}}/checklist/{{$parameter.checklistItemId}}/score',
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

export const scoreTaskChecklistItemParameters: INodeProperties[] = [
	// select task
	{
		...parameterSelectTask,
		description: 'The task to score the checklist item on',
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					scoreTaskChecklistItemOperation.value,
				]
			}
		},
	},
	// checklist item id (string), no need to select from list (probably)
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the checklist item to score',
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					scoreTaskChecklistItemOperation.value,
				]
			}
		},
	},


];

