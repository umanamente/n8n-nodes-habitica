import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const reviveOperation: INodePropertyOptions =
{
  name: 'Revive User',
  value: "revive",
  action: "Revive user",
  routing: {
    request: {
      method: 'POST',
      url: 'user/revive',
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

export const reviveParameters: INodeProperties[] = [];
