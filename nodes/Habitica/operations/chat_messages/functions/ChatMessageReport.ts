import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceChatMessage } from "../ResourceName";

export const reportMessageOperation: INodePropertyOptions =
{
	name: 'Report Message',
	value: 'reportMessage',
	action: 'Flag (report)',
	description: 'Report a malicious chat message',
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/chat/{{$parameter.messageId}}/flag',
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

export const reportMessageParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					reportMessageOperation.value,
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
					reportMessageOperation.value,
				],
			},
		},
	},
];
