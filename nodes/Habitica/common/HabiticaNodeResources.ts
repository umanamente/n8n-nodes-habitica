import { INodePropertyOptions } from "n8n-workflow";

export const habiticaApiBaseUrl = 'https://habitica.com/api/v3/';

export const resourceTask: INodePropertyOptions = {
	name: 'Task',
	value: 'task',
};

export const resourceSpell: INodePropertyOptions = {
	name: 'Skill (Spell)',
	value: 'spell',
};

export const resourceQuest: INodePropertyOptions = {
	name: 'Quest',
	value: 'quest',
};

export const resourceInboxMessage: INodePropertyOptions = {
	name: 'Inbox Message',
	value: 'inboxMessage',
};

export const resourceChatMessage: INodePropertyOptions = {
	name: 'Chat Message',
	value: 'chatMessage',
};

export const resourceCron: INodePropertyOptions = {
	name: 'Cron',
	value: 'cron',
};

export const habiticaNodeResources = [
	resourceTask,
	resourceSpell,
	//resourceQuest,
	//resourceInboxMessage,
	//resourceInventory,
	resourceChatMessage,
	resourceCron,
];
