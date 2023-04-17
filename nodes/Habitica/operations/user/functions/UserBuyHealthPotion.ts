import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const buyHealthPotionsOperation: INodePropertyOptions =
{
	name: "Buy a Health Potion",
	value: "buyHealthPotion",
	action: "Buy a health potion",
	routing: {
		request: {
			method: 'POST',
			url: '=user/buy-health-potion',
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

export const buyHealthPotionsParameters : INodeProperties[] = [
	// no parameters
];
