import { IResourceDef } from "../common/CommonDefinitions";
import { resourceInbox } from "./ResourceName";
import { getInboxMessagesOperation, getInboxMessagesParameters } from "./functions/InboxGetMessages";
import { sendPrivateMessageOperation, sendPrivateMessageParameters } from "./functions/InboxSendPrivateMessage";

export const inboxResourceDefinitions: IResourceDef = {
	resource: resourceInbox,
	operationDefs: [
		{
			operation: getInboxMessagesOperation,
			parameters: getInboxMessagesParameters,
		},
		{
			operation: sendPrivateMessageOperation,
			parameters: sendPrivateMessageParameters,
		}
	],
};
