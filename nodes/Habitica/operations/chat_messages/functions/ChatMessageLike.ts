import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";

export const likeMessageOperation: INodePropertyOptions =
{
	name: 'Like Message',
	value: 'likeMessage',
	action: 'Like',
	description: 'Like a chat message',
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/chat/{{$parameter.messageId}}/like',
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

export const likeMessageParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				operation: [
					likeMessageOperation.value,
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
				operation: [
					likeMessageOperation.value,
				],
			},
		},
	},
];
