import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceChatMessage } from "../ResourceName";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";

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
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					postChatMessageIntoGroupOperation.value,
				],
			},
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
