import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceInbox } from "../ResourceName";

export const getInboxMessagesOperation: INodePropertyOptions =
{
	name: 'Get Inbox Messages',
	value: 'getInboxMessages',
	action: 'Get inbox messages',
	routing: {
		request: {
			method: 'GET',
			url: '=inbox/messages',
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

export const getInboxMessagesParameters : INodeProperties[] = [
	// all messages
	{
		displayName: 'All Messages',
		name: 'allMessages',
		type: 'boolean',
		default: false,
		description: "Whether to load all messages or use pagination",
	},
	// Load the messages of the selected Page - 10 Messages per Page
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		default: 0,
		description: 'Load the messages of the selected Page, 10 Messages per Page',
		routing: {
			send:{
				type: 'query',
				property: 'page',
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceInbox.value,
				],
				operation: [
					getInboxMessagesOperation.value,
				],
				allMessages: [
					false,
				],
			},
		},
	},
	// TODO: conversation	GUID - Loads only the messages of a conversation (not clearly documented)
];
