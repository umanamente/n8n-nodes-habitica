import { IResourceDef } from "../common/CommonDefinitions";
import { resourceInbox } from "./ResourceName";
import { getInboxMessagesOperation, getInboxMessagesParameters } from "./functions/InboxGetMessages";

export const inboxResourceDefinitions: IResourceDef = {
	resource: resourceInbox,
	operationDefs: [
		{
			operation: getInboxMessagesOperation,
			parameters: getInboxMessagesParameters,
		}
	],
};
