import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const getGameWorldStateOperation: INodePropertyOptions =
{
	name: "Get Game World State",
	value: "getGameWorldState",
	action: "Get game world state",
	routing: {
		request: {
			method: 'GET',
			url: '=world-state',
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

export const getGameWorldStateParameters : INodeProperties[] = [
	// no parameters
];
