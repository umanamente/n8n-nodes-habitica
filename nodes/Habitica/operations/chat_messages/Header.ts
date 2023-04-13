import { getGroupChatMessagesOperation, getGroupChatMessagesParameters } from "./functions/ChatMessageGetMany";
import { resourceChatMessage } from "./ResourceName";
import { postChatMessageIntoGroupOperation, postChatMessageIntoGroupParameters } from "./functions/ChatMessagePostIntoGroup";
import { IResourceDef } from "../common/CommonDefinitions";
import { markAllAsReadOperation, markAllAsReadParameters } from "./functions/ChatMessageMarkAllAsRead";

export const chatMessagesResourceDefinitions: IResourceDef = {
	resource: resourceChatMessage,
	operationDefs: [
		{
			operation: getGroupChatMessagesOperation,
			parameters: getGroupChatMessagesParameters,
		},
		{
			operation: postChatMessageIntoGroupOperation,
			parameters: postChatMessageIntoGroupParameters,
		},
		{
			operation: markAllAsReadOperation,
			parameters: markAllAsReadParameters,
		}
	],
};


