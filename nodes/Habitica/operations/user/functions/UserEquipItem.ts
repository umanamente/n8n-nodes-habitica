import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceUser } from "../ResourceName";

export const equipItemOperation: INodePropertyOptions =
{
  name: 'Equip or Unequip an Item',
  value: "equipItem",
  action: "Equip or unequip an item",
  routing: {
    request: {
      method: 'POST',
      url: '=user/equip/{{$parameter.itemType}}/{{$parameter.itemKey}}',
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

export const equipItemParameters: INodeProperties[] = [
  {
    // allowed values: "mount", "pet", "costume", "equipped"
    displayName: 'Type',
    name: 'itemType',
    type: 'options',
    hint: 'Type of the item to equip or unequip',
    options: [
      {
        name: 'Mount',
        value: 'mount',
      },
      {
        name: 'Pet',
        value: 'pet',
      },
      {
        name: 'Costume',
        value: 'costume',
      },
      {
        name: 'Gear',
        value: 'equipped',
      },
    ],
    default: 'mount',
    required: true,
    description: 'Type of the item to equip or unequip',
    displayOptions: {
      show: {
        resource: [
          resourceUser.value,

        ],
        operation: [
          equipItemOperation.value,
        ]
      }
    },
  },
  {
    displayName: 'Key',
    name: 'itemKey',
    type: 'string',
    required: true,
    default: '',
    description: 'Key of the item to equip or unequip',
    displayOptions: {
      show: {
        resource: [
          resourceUser.value,

        ],
        operation: [
          equipItemOperation.value,
        ]
      }
    },
  }
];



