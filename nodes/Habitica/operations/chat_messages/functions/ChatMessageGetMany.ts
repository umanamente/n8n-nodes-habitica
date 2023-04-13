import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceChatMessage } from "../ResourceName";


export const getGroupChatMessagesOperation: INodePropertyOptions =
{
	name: 'Get Many',
	value: 'getAll',
	action: 'Get many group chat messages',
	description: 'Get all group chat messages',
	routing: {
		request: {
			method: 'GET',
			url: '=groups/{{$parameter.groupId}}/chat',
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

export const getGroupChatMessagesParameters : INodeProperties[] = [
	// group id selector
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'options',
		required: true,
		default: 'party',
		description: 'The group to get chat messages from',
		// 'party' for the user party and 'habitrpg' for tavern are accepted
		options: [
			{
				name: 'User Party',
				value: 'party',
			},
			{
				name: 'Tavern',
				value: 'habitrpg',
			},
		],
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					getGroupChatMessagesOperation.value,
				]
			}
		},
	},

];
