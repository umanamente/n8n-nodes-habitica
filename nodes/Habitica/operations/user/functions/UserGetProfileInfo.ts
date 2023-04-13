import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceUser } from "../ResourceName";

export const getUserProfileInfoOperation: INodePropertyOptions =
{
	name: 'Get User Profile Info',
	value: 'getUserProfileInfo',
	action: 'Get User Profile Info',
	routing: {
		request: {
			method: 'GET',
			url: '=user',
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

// this list was taken from https://github.com/HabitRPG/habitica/blob/develop/website/server/libs/user/index.js
/*export const publicFields = `preferences.size preferences.hair preferences.skin preferences.shirt
  preferences.chair preferences.costume preferences.sleep preferences.background preferences.tasks preferences.disableClasses profile stats
  achievements party backer contributor auth.timestamps items inbox.optOut loginIncentives flags.classSelected
  flags.verifiedUsername auth.local.username`;
*/

// TODO: these fields are not clearly defined in the Habitica API docs
// 			 some might be missing

// pairs "name"-"Display Name"
export const publicFieldsDisplayNames : {[key: string]: string} = {
	"items": "Items",
	"stats": "Stats",
	"party": "Party",
	"inbox.optOut": "Inbox",
	"profile": "Profile",
	"achievements": "Achievements",
	"backer": "Backer",
	"contributor": "Contributor",
	"loginIncentives": "Login Incentives", // most likely "How many days user has logged in"
	//"classSelected": "Flags: Class Selected", // not sure what this is
	//"verifiedUsername": "Flags: Verified Username", // probably not needed
	//"preferences.***" - not working, server returns 500 error
};

export const getUserProfileInfoParameters: INodeProperties[] = [
	// switch "get all info" on/off (off by default)
	{
		displayName: 'Get All Info',
		name: 'getAllInfo',
		type: 'boolean',
		default: false,
		description: 'Whether to get all info about the user',
		displayOptions: {
			show: {
				resource: [
					resourceUser.value,

				],
				operation: [
					getUserProfileInfoOperation.value,
				]
			}
		},
	},

	// select multiple categories to get
	{
		displayName: 'Select Categories',
		name: 'selectCategories',
		type: 'multiOptions',
		placeholder: 'Select Categories',
		default: [],
		options: Object.entries(publicFieldsDisplayNames).map(function ([publicFieldName, publicFieldDisplayName]) {
			return ({
				name: publicFieldDisplayName,
				value: publicFieldName,
			});
		}),
		routing: {
			send: {
				preSend: [
					async function combineIntoCommaSeparatedString(
						this: IExecuteSingleFunctions,
						requestOptions: IHttpRequestOptions,
					): Promise<IHttpRequestOptions> {
						const categoriesArray = this.getNodeParameter('selectCategories', []) as string[];
						const commaSeparatedCategories = categoriesArray.join(',');
						requestOptions.qs = requestOptions.qs || {}; // init query object if it doesn't exist
						requestOptions.qs.userFields = commaSeparatedCategories;
						return requestOptions;
					}
				],
			},
		},
		displayOptions: {
			show: {
				resource: [
					resourceUser.value,
				],
				operation: [
					getUserProfileInfoOperation.value,
				],
				getAllInfo: [
					false,
				],
			},
		},
	},

];
