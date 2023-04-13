import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceChatMessage } from "../ResourceName";

export const deleteMessageOperation: INodePropertyOptions =
{
	name: 'Delete Message',
	value: 'deleteMessage',
	action: 'Delete',
	description: 'Delete a chat message',
	routing: {
		request: {
			method: 'DELETE',
			url: '=groups/{{$parameter.groupId}}/chat/{{$parameter.messageId}}',
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

export const deleteMessageParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					deleteMessageOperation.value,
				],
			},
		},
	},
	// message ID
	//   (doesn't make sense to select from a list here,
	//   it should be obtained from "Get All Messages" node at runtime)
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					deleteMessageOperation.value,
				],
			},
		},
	},
];
