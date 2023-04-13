import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const getUserShopItemsOperation: INodePropertyOptions =
{
	name: 'List Items Available for Purchase',
	value: 'getShopItems',
	action: 'List items available for purchase',
	routing: {
		request: {
			method: 'GET',
			url: '=user/inventory/buy',
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

export const getUserShopItemsParameters : INodeProperties[] = [
	// no parameters
];
