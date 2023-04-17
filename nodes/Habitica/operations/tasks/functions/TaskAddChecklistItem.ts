import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectTask } from "../../../parameters/ParameterSelectTask";
import { resourceTask } from "../ResourceName";

export const addTaskChecklistItemOperation: INodePropertyOptions =
{
	name: "Add Checklist Item",
	value: "addTaskChecklistItem",
	action: "Add Checklist Item",
	routing: {
		request: {
			method: 'POST',
			url: '=tasks/{{$parameter.taskId}}/checklist',
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

export const addTaskChecklistItemParameters: INodeProperties[] = [
	// select task
	{
		...parameterSelectTask,
		description: 'The task to add the checklist item to',
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					addTaskChecklistItemOperation.value,
				]
			}
		},
	},
	// string: Checklist Item Text
	{
		displayName: 'Checklist Item Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'The text of the checklist item',
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					addTaskChecklistItemOperation.value,
				]
			}
		},
	},
	// boolean field: completed
	{
		displayName: 'Completed',
		name: 'completed',
		type: 'boolean',
		default: false,
		description: 'Whether the checklist item is completed',
		routing: {
			send: {
				type: 'body',
				property: 'completed',
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					addTaskChecklistItemOperation.value,
				]
			}
		},
	},

];

