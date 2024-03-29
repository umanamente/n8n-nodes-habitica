import { IDataObject, ILoadOptionsFunctions, INodeListSearchResult, INodeProperties } from "n8n-workflow";
import { habiticaApiRequest } from "../common/HabiticaApiRequest";
import { validationGuidRegex } from "./Common";
import { AUTHOR_ID } from "../../../credentials/HabiticaApi.credentials";


// search groups
export async function searchGroups(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {

	// TODO: guilds are returned in groups of 30. Currently only the first 30 are returned

	const groups = await habiticaApiRequest.call(this, 'GET', 'groups', {}, {

		// TODO: too many groups are returned if all types are selected. Currently only party,  tavern, and guilds are returned

		// Possible values are party, guilds, privateGuilds, publicGuilds, tavern
		type: 'party,tavern,guilds'
	});

	this.logger.debug("Loaded " + groups.length + " groups");
	this.logger.debug("groups: " + JSON.stringify(groups));

	return {
		results: groups.map((group: IDataObject) => ({
			name: group.name,
			value: group.id,
		})),
	};
}


/**
 * base parameter for selecting a group
 */
export const parameterSelectGroup: INodeProperties	= {
	displayName: 'Group',
	name: 'groupId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	description: 'Select a group',
	required: true,
	modes: [
		{
			displayName: 'List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'searchGroups',
				searchable: false,
				searchFilterRequired: false
			}
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			hint: 'Enter a group ID',
			validation: [
				validationGuidRegex,
			],
			placeholder: AUTHOR_ID,
		},
	],
};
