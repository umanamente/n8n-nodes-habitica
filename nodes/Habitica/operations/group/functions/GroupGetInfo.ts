
// API Docs:
// https://habitica.com/apidoc/#api-Group-GetGroup

import { INodePropertyOptions, INodeProperties } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceGroup } from "../ResourceName";


export const groupGetInfoOperation: INodePropertyOptions =
{
	name: "Get Group Info",
	value: "groupGetInfo",
	action: "Get group info",
	description: "Returns the group's data",
	routing: {
		request: {
			method: 'GET',
			url: '=groups/{{$parameter.groupId}}',
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

export const groupGetInfoParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		description: 'The group to get the info for',
		displayOptions: {
			show: {
				resource: [
					resourceGroup.value,
				],
				operation: [
					groupGetInfoOperation.value,
				]
			}
		},
	},
];
