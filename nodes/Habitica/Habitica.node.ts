import { ILoadOptionsFunctions, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { habiticaApiBaseUrl, habiticaApiRequest } from './common/HabiticaApiRequest';
import { searchTasks } from './parameters/ParameterSelectTask';
import { searchGroups } from './parameters/ParameterSelectGroup';
import { allResourceDefinitions } from './operations/OperationsHeader';
import { getAllResourceNodeParameters } from './operations/common/CommonDefinitions';

export class Habitica implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Habitica',
		name: 'habitica',
		icon: 'file:habitica-icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Habitica API',
		defaults: {
			name: 'Habitica',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'habiticaApi',
				required: true,
			},
		],

		requestDefaults: {
			baseURL: habiticaApiBaseUrl,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: allResourceDefinitions.map((resourceDef) => resourceDef.resource),
				default: allResourceDefinitions[0].resource.value,
			},

			// combine all parameters from all operations
			...allResourceDefinitions.map((resourceDef) => getAllResourceNodeParameters(resourceDef)).flat(),
		],
	};

	methods = {
		listSearch: {
			// searchTasks
			searchTasks: searchTasks,
			searchGroups: searchGroups,
			async searchUserPartyMembers(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				/*
				With a limit of 30 member per request (by default).
				To get all members run requests against this routes (updating the lastId query parameter)
				until you get less than 30 results (or the specified limit).
				*/

				// TODO: only up to 30 members are loaded. Need to implement pagination
				interface IPartyMember {
					id: string;
					profile: {
						name: string;
					};
				}

				const partyMembers = await habiticaApiRequest.call(this, 'GET', 'groups/party/members');
				this.logger.debug("Loaded " + partyMembers.length + " party members");
				return {
					results: partyMembers.map(function (member: IPartyMember) {
						var memberName = "Unknown: " + member.id;
						if (member.profile && member.profile.name) {
							memberName = member.profile.name;
						}
						return ({
							name: memberName,
							value: member.id,
						});
					}),
				};
			}
		},
	};
}
