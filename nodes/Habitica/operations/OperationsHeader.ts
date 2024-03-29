import { taskResourceDefinitions } from "./tasks/Header";
import { IResourceDef } from "./common/CommonDefinitions";
import { chatMessagesResourceDefinitions } from "./chat_messages/Header";
import { spellsResourceDefinitions } from "./spells/Header";
import { cronResourceDefinitions } from "./cron/Header";
import { userResourceDefinitions } from "./user/Header";
import { questResourceDefinitions } from "./quest/Header";
import { groupResourceDefinitions } from "./group/Header";
import { contentResourceDefinitions } from "./content/Header";
import { inboxResourceDefinitions } from "./inbox/Header";

export const allResourceDefinitions: IResourceDef[] = [
	taskResourceDefinitions,
	chatMessagesResourceDefinitions,
	spellsResourceDefinitions,
	cronResourceDefinitions,
	userResourceDefinitions,
	questResourceDefinitions,
	groupResourceDefinitions,
	contentResourceDefinitions,
	inboxResourceDefinitions,
];
