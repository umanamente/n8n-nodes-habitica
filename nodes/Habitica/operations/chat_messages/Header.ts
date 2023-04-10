import { INodeProperties } from "n8n-workflow";
import { getGroupChatMessagesOperation, getGroupChatMessagesParameters } from "./ChatMessageGetMany";
import { resourceChatMessage } from "../../common/HabiticaNodeResources";
import { postChatMessageIntoGroupOperation, postChatMessageIntoGroupParameters } from "./ChatMessagePostIntoGroup";

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
const chatMessagesOperations : INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: getGroupChatMessagesOperation.value,
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				resourceChatMessage.value,
			],
		},
	},
	options: [
		getGroupChatMessagesOperation,
		postChatMessageIntoGroupOperation,
	],
};

export const chatMessagesParameters: INodeProperties[] = [
	// operation
	chatMessagesOperations,

	// related parameters
	...getGroupChatMessagesParameters,
	...postChatMessageIntoGroupParameters,
];
