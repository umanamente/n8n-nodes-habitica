import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceInbox } from "../ResourceName";

export const getInboxMessagesOperation: INodePropertyOptions =
{
  name: 'Get Inbox Messages',
  value: 'getInboxMessages',
  action: 'Get inbox messages',
  routing: {
    request: {
      method: 'GET',
      url: '=inbox/messages',
    },
    output: {
      postReceive: [
        {
          type: 'rootProperty',
          properties: {
            property: 'data',
          },
        },
      ],
    },
  },
};

export const getInboxMessagesParameters : INodeProperties[] = [
  // all messages
  {
    displayName: 'All Messages',
    name: 'allMessages',
    type: 'boolean',
    default: false,
    description: "Whether to load all messages or use pagination",
    displayOptions: {
      show: {
        resource: [
          resourceInbox.value,
        ],
        operation: [
          getInboxMessagesOperation.value,
        ],
      },
    },
  },
  // conversation GUID
  {
    displayName: 'Conversation GUID',
    name: 'conversationId',
    type: 'string',
    default: '',
    description: 'GUID of the conversation',
    hint: "Usually a user UUID. Leave empty to get all messages",
    routing: {
      send:{
        type: 'query',
        property: 'conversation',
      },
    },
    displayOptions: {
      show: {
        resource: [
          resourceInbox.value,
        ],
        operation: [
          getInboxMessagesOperation.value,
        ],
        allMessages: [
          false,
        ],
      },
    },
  },
  // Load the messages of the selected Page - 10 Messages per Page
  {
    displayName: 'Page Number',
    name: 'page',
    type: 'number',
    default: 0,
    description: 'Load the messages of the selected Page, 10 Messages per Page',
    routing: {
      send:{
        type: 'query',
        property: 'page',
      },
    },
    displayOptions: {
      show: {
        resource: [
          resourceInbox.value,
        ],
        operation: [
          getInboxMessagesOperation.value,
        ],
        allMessages: [
          false,
        ],
      },
    },
  },
];
