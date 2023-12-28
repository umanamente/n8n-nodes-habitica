// Invite users to a quest
// https://habitica.com/apidoc/#api-Quest-InviteToQuest

import { INodePropertyOptions, INodeProperties } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceQuest } from "../ResourceName";

export const questInviteOperation: INodePropertyOptions =
{
	name: "Invite to Quest",
	value: "questInvite",
	action: "Invite to quest",
	description: "Invite users to a quest",
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/quests/invite/{{$parameter.questKey}}',
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

export const questInviteParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		description: 'The group to invite to the quest',
		displayOptions: {
			show: {
				resource: [
					resourceQuest.value,
				],
				operation: [
					questInviteOperation.value,
				]
			}
		},
	},
	// quest key
	{
		displayName: 'Quest Key',
		name: 'questKey',
		type: 'string',
		required: true,
		default: '',
		description: 'The key of the quest to invite to',
		displayOptions: {
			show: {
				resource: [
					resourceQuest.value,
				],
				operation: [
					questInviteOperation.value,
				]
			}
		},
	},
];
