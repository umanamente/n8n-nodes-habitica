import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceGroup } from "../ResourceName";

export const getManyGroupsOperation: INodePropertyOptions =
{
	name: "Get Many",
	value: "getManyGroups",
	action: "Get many",
	description: 'Get many groups',
	routing: {
		request: {
			method: 'GET',
			url: '=groups',
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

export const getManyGroupsParameters : INodeProperties[] = [
	// The type of groups to retrieve. Must be a query string representing a list of values like 'tavern,party'. Possible values are party, guilds, privateGuilds, publicGuilds, tavern.
	{
		displayName: 'Group Types',
		name: 'groupTypes',
		type: 'multiOptions',
		default: ['party', 'tavern', 'guilds', 'privateGuilds'],
		required: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
		options: [
			{
				name: 'Party',
				value: 'party',
			},
			{
				name: 'Guilds',
				value: 'guilds',
			},
			{
				name: 'Tavern',
				value: 'tavern',
			},
			{
				name: 'Private Guilds',
				value: 'privateGuilds',
			},
			{
				name: 'Public Guilds',
				value: 'publicGuilds',
			},
		],
		routing: {
			send: {
				preSend: [
					async function combineIntoCommaSeparatedString(
						this: IExecuteSingleFunctions,
						requestOptions: IHttpRequestOptions,
					): Promise<IHttpRequestOptions> {
						const categoriesArray = this.getNodeParameter('groupTypes', []) as string[];
						const commaSeparatedCategories = categoriesArray.join(',');
						requestOptions.qs = requestOptions.qs || {}; // init query object if it doesn't exist
						requestOptions.qs.type = commaSeparatedCategories;
						return requestOptions;
					}
				],
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceGroup.value,
				],
				operation: [
					getManyGroupsOperation.value,
				],
			},
		},
	},
	// TODO: Public guilds support pagination. When true guilds are returned in groups of 30.
];
