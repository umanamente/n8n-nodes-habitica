import { ILoadOptionsFunctions, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { resourceChatMessage, resourceCron, resourceSpell, resourceTask } from './common/HabiticaNodeResources';
import { taskParameters } from './operations/tasks/Header';
import { spellParameters } from './operations/spells/Header';
import { chatMessagesParameters } from './operations/chat_messages/Header';
import { cronParameters } from './operations/cron/Header';
import { habiticaApiRequest } from './common/HabiticaApiRequest';
import { searchTasks } from './parameters/ParameterSelectTask';
import { searchGroups } from './parameters/ParameterSelectGroup';

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
			baseURL: 'https://habitica.com/api/v3/',
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
				options: [
					resourceTask,
					resourceSpell,
					//resourceQuest,
					//resourceInboxMessage,
					//resourceInventory,
					resourceChatMessage,
					resourceCron,
				],
				default: resourceTask.value,
			},

			// Task parameters
			...taskParameters,

			// Spell parameters
			...spellParameters,

			// Chat message parameters
			...chatMessagesParameters,

			// Cron parameters
			...cronParameters
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
