import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceChatMessage } from "../../definitions/HabiticaNodeResources";

export const postChatMessageIntoGroupOperation: INodePropertyOptions =
{
	name: 'Post Into Group',
	value: 'postIntoGroup',
	action: 'Post a chat message',
	description: 'Post a chat message into a group',
	routing: {
		request: {
			method: 'POST',
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

export const postChatMessageIntoGroupParameters : INodeProperties[] = [
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
					postChatMessageIntoGroupOperation.value,
				]
			}
		},
	},
	// message text
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: {
			alwaysOpenEditWindow: true,
			rows: 5,
		},
		required: true,
		default: '',
		description: 'The message to post',
		routing: {
			send: {
				type: 'body',
				property: 'message',
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					postChatMessageIntoGroupOperation.value,
				]
			}
		},
	},


];
