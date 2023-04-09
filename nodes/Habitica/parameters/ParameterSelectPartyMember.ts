import { INodeProperties } from "n8n-workflow";

/**
 * base parameter for selecting a party member
 */
export const parameterSelectUserPartyMember: INodeProperties	= {
	displayName: 'Party Member',
	name: 'partyMemberId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	description: 'Select a party member',
	required: true,
	modes: [
		{
			displayName: 'List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'searchUserPartyMembers',
				searchable: false,
				searchFilterRequired: false
			}
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			hint: 'Enter a party member ID',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}",
						errorMessage: 'The ID must look like this: "a1abf9df-d89d-4f5e-9e80-26dc3c481042"',
					},
				},
			],
			placeholder: 'a1abf9df-d89d-4f5e-9e80-26dc3c481042',
		},
	],
};
