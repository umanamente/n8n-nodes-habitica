import { INodeProperties } from "n8n-workflow";
import { IHabiticaTriggerBase } from "./Common";
import { parameterSelectGroup } from "../parameters/ParameterSelectGroup";

export const triggerGroupChatMessageReceived: IHabiticaTriggerBase = {
	eventName: 'groupChatMessageReceived',
	habiticaWebhookType: 'groupChatReceived',
	triggerDefinition: {
		name: 'Group Chat Message Received',
		value: 'groupChatMessageReceived',
	},
	updateBodyParamsForCreateWebhook: (body: any, hookFunctions: any): void => {
		// get group id from parameter
		const groupId = hookFunctions.getNodeParameter('groupId', "<unknown>", {extractValue: true}) as string;
		body.options = {
			groupId: groupId,
		};
	},
};

export const triggerGroupChatMessageReceivedParameters: INodeProperties[] = [
	// select group
	{
		...parameterSelectGroup,
		displayOptions: {
			show: {
				event: [
					triggerGroupChatMessageReceived.eventName,
				],
			},
		},
	},
];

