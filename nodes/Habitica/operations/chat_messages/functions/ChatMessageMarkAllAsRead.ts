import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";

export const markAllAsReadOperation: INodePropertyOptions =
{
	name: 'Mark All As Read',
	value: 'markAllAsRead',
	action: 'Mark all as read',
	description: 'Mark all chat messages as read',
	routing: {
		request: {
			method: 'POST',
			url: '=groups/{{$parameter.groupId}}/chat/seen',
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

export const markAllAsReadParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				operation: [
					markAllAsReadOperation.value,
				],
			},
		},
	},
];
