import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
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
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceChatMessage.value,
				],
				operation: [
					getGroupChatMessagesOperation.value,
				],
			},
		},
	},
];
