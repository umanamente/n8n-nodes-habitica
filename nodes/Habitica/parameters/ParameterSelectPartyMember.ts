import { INodeProperties } from "n8n-workflow";
import { validationGuidRegex } from "./Common";
import { AUTHOR_ID } from "../../../credentials/HabiticaApi.credentials";

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
			hint: 'Enter a user ID',
			validation: [
				validationGuidRegex,
			],
			placeholder: AUTHOR_ID,
		},
	],
};
