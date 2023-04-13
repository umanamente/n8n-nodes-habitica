import { getGroupChatMessagesOperation, getGroupChatMessagesParameters } from "./functions/ChatMessageGetMany";
import { resourceChatMessage } from "./ResourceName";
import { postChatMessageIntoGroupOperation, postChatMessageIntoGroupParameters } from "./functions/ChatMessagePostIntoGroup";
import { IResourceDef } from "../common/CommonDefinitions";
import { markAllAsReadOperation, markAllAsReadParameters } from "./functions/ChatMessageMarkAllAsRead";
import { likeMessageOperation, likeMessageParameters } from "./functions/ChatMessageLike";
import { reportMessageOperation, reportMessageParameters } from "./functions/ChatMessageReport";
import { deleteMessageOperation, deleteMessageParameters } from "./functions/ChatMessageDelete";

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
		},
		{
			operation: likeMessageOperation,
			parameters: likeMessageParameters,
		},
		{
			operation: reportMessageOperation,
			parameters: reportMessageParameters,
		},
		{
			operation: deleteMessageOperation,
			parameters: deleteMessageParameters,
		}
	],
};


