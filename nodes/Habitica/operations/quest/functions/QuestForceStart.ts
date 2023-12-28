// API docs:
// https://habitica.com/apidoc/#api-Quest-ForceQuestStart

import { INodePropertyOptions, INodeProperties } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceQuest } from "../ResourceName";


export const questForceStartOperation: INodePropertyOptions =
{
	name: "Force Start Quest",
	value: "questForceStart",
	action: "Force start quest",
	description: "Force start the quest",
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/quests/force-start',
		},
		output: {
			postReceive: [
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

export const questForceStartParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		description: 'The group to start the quest for',
		displayOptions: {
			show: {
				resource: [
					resourceQuest.value,
				],
				operation: [
					questForceStartOperation.value,
				]
			}
		},
	},
];
