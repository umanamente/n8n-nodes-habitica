import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceQuest } from "../ResourceName";

export const acceptQuestOperation: INodePropertyOptions =
{
	name: "Accept Quest",
	value: "acceptQuest",
	action: "Accept",
	description: 'Accept a quest',
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/quests/accept',
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

export const acceptQuestParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceQuest.value,
				],
				operation: [
					acceptQuestOperation.value,
				],
			},
		},
	},
];
