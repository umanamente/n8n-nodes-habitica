import { IDataObject, ILoadOptionsFunctions, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { getAllTasksOperation, getAllTasksParameters } from './operations/TaskGetMany';
import { scoreTaskOperation, scoreTaskParameters } from './operations/TaskScore.node';
import { habiticaApiRequest } from './operations/HabiticaApiRequest';
import { createUserTaskOperation, createUserTaskParameters } from './operations/TaskCreateForUser';
import { spellCastOperation, spellCastParameters } from './operations/SpellCast';

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
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Skill (Spell)',
						value: 'spell',
					},
					{
						name: 'Quest',
						value: 'quest',
					},
					{
						name: 'Inbox Message',
						value: 'inboxMessage',
					},
					{
						name: 'Cron',
						value: 'cron',
					},

				],
				default: 'task',
			},
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: getAllTasksOperation.value,
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'task',
						],
					},
				},
				options: [
					getAllTasksOperation,
					scoreTaskOperation,
					createUserTaskOperation,
				],
			},
			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: spellCastOperation.value,
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'spell',
						],
					},
				},
				options: [
					spellCastOperation
				],
			},

			// Task parameters
			...getAllTasksParameters,
			...scoreTaskParameters,
			...createUserTaskParameters,

			// Spell parameters
			...spellCastParameters,
		],
	};

	methods = {
		listSearch: {
			async searchTasks(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				const tasks = await habiticaApiRequest.call(this, 'GET', 'tasks/user');
				this.logger.debug("Loaded " + tasks.length + " tasks");
				return {
					results: tasks.map((task: IDataObject) => ({
						name: task.text,
						value: task.id,
					})),
				};
			},
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
