import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceInbox } from "../ResourceName";
import { parameterSelectUserPartyMember } from "../../../parameters/ParameterSelectPartyMember";

export const sendPrivateMessageOperation: INodePropertyOptions =
{
	name: "Send Private Message",
	value: "sendPrivateMessage",
	action: "Send private message",
	routing: {
		request: {
			method: 'POST',
			url: '=members/send-private-message',
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

export const sendPrivateMessageParameters : INodeProperties[] = [
	// toUserId, UUID, The id of the user to contact
	// provide a select list of party members, and allow the user to enter a user ID
	{
		...parameterSelectUserPartyMember,
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-not-first-position
		displayName: 'Recipient User ID',
		name: 'toUserId',
		description: 'The ID of the user to contact',
		routing: {
			send:{
				type: 'body',
				property: 'toUserId',
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceInbox.value,
				],
				operation: [
					sendPrivateMessageOperation.value,
				],
			},
		},

	},
	// message, String, The message to send
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		description: 'The message to send',
		typeOptions: {
			alwaysOpenEditWindow: true,
			rows: 5,
		},
		routing: {
			send:{
				type: 'body',
				property: 'message',
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceInbox.value,
				],
				operation: [
					sendPrivateMessageOperation.value,
				],
			},
		},
	},
];
