import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { parameterSelectGroup } from "../../../parameters/ParameterSelectGroup";
import { resourceGroup } from "../ResourceName";

export const getGroupMembersOperation: INodePropertyOptions =
{
	name: "Get Members",
	value: "getMembers",
	action: "Get members",
	description: 'Get members of a group',
	routing: {
		request: {
			method: 'GET',
			url: '=groups/{{$parameter.groupId}}/members',
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

export const getGroupMembersParameters : INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				resource: [
					resourceGroup.value,
				],
				operation: [
					getGroupMembersOperation.value,
				],
			},
		},
	},
	// includeAllPublicFields
	{
		displayName: 'Include All Public Fields',
		name: 'includeAllPublicFields',
		type: 'boolean',
		default: false,
		description: 'Whether to include all public fields for members (similar to when making a request for a single member)',
		displayOptions: {
			show: {
				resource: [
					resourceGroup.value,
				],
				operation: [
					getGroupMembersOperation.value,
				],
			},
		},
		routing: {
			// Query Parameter: includeAllPublicFields
			send:{
				property: "includeAllPublicFields",
				type: "query",
			},
		},
	},
	// includeTasks (If set to true, then response should include all tasks per user related to the challenge)
	{
		displayName: 'Include Tasks',
		name: 'includeTasks',
		type: 'boolean',
		default: false,
		description: "Whether to include all tasks per user related to the challenge",
		displayOptions: {
			show: {
				resource: [
					resourceGroup.value,
				],
				operation: [
					getGroupMembersOperation.value,
				],
			},
		},
		routing: {
			// Query Parameter: includeTasks
			send:{
				property: "includeTasks",
				type: "query",
			},
		},
	},
];
