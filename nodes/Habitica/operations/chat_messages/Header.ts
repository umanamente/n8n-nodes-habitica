import { getGroupChatMessagesOperation, getGroupChatMessagesParameters } from "./functions/ChatMessageGetMany";
import { resourceChatMessage } from "./ResourceName";
import { postChatMessageIntoGroupOperation, postChatMessageIntoGroupParameters } from "./functions/ChatMessagePostIntoGroup";
import { IResourceDef } from "../common/CommonDefinitions";

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
	],
};


