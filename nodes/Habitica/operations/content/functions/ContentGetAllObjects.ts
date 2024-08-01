import { IDataObject, IExecuteSingleFunctions, IN8nHttpFullResponse, INodeExecutionData, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceContent } from "../ResourceName";
import { contentKeys } from "../utils/ContentKeys";

function getContentKeysParameters(): INodeProperties[] {
  let keysOptions : INodePropertyOptions[] = [];
  for (let key of contentKeys) {
    keysOptions.push({
      name: key,
      value: key,
    });
  }

  return [
    {
      displayName: 'Return All Keys',
      name: 'returnAllKeys',
      type: 'boolean',
      default: true,
      description: 'Whether to return all keys',
      displayOptions: {
        show: {
          resource: [
            resourceContent.value,
          ],
          operation: [
            getAllContentObjectsOperation.value,
          ],
        },
      },
    },
    {
      displayName: 'Keys',
      name: 'keys',
      type: 'multiOptions',
      required: true,
      description: 'The keys of the сontent object to return',
      default: [],
      options: keysOptions,
      displayOptions: {
        show: {
          resource: [
            resourceContent.value,
          ],
          operation: [
            getAllContentObjectsOperation.value,
          ],
          returnAllKeys: [
            false,
          ],
        },
      },
    },
  ];
}

// filter the content object to return only the keys specified in the keys parameter
async function postReceiveFunction(this: IExecuteSingleFunctions, items: INodeExecutionData[], response: IN8nHttpFullResponse): Promise<INodeExecutionData[]> {
  return items.flatMap((item) =>  {
    const paramReturnAllKeys = this.getNodeParameter('returnAllKeys') as boolean;
    if (paramReturnAllKeys) {
      // no filtering needed, return the whole object
      return item;
    } else {
      // filter the keys
      const keys = this.getNodeParameter('keys') as string[];
      const filteredJson : IDataObject = {};
      for (let key of keys) {
        // check if key exists in the json
        filteredJson[key] = item.json[key];
      }
      return { json: filteredJson } as INodeExecutionData;
    }


  });

}

export const getAllContentObjectsOperation: INodePropertyOptions =
{
  name: "Get All Objects",
  value: "getAllObjects",
  action: "Get all content objects",
  //description: "Get all content objects",
  routing: {
    request: {
      method: 'GET',
      url: '=content',
    },
    output: {
      postReceive: [
        {
          type: 'rootProperty',
          properties: {
            property: 'data',
          },
        },
        postReceiveFunction,
      ],
    },
  },
};

// list of allowed languages (https://habitica.com/apidoc/#api-Content-ContentGet)
const allowedLanguages = [
  "bg", "cs", "da", "de", "en", "en@pirate", "en_GB", "es", "es_419", "fr", "he", "hu", "id", "it", "ja", "nl", "pl", "pt", "pt_BR", "ro", "ru", "sk", "sr", "sv", "uk", "zh", "zh_TW"
].sort();

export const getAllContentObjectsParameters : INodeProperties[] = [
  // language
  {
    displayName: 'Language',
    name: 'language',
    type: 'options',
    options: allowedLanguages.map(language => ({ name: language, value: language })),
    // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
    default: 'en',
    description: 'The language to return the content in',
    routing: {
      send: {
        type: 'query',
        property: 'language',
      },
    },
    displayOptions: {
      show: {
        resource: [
          resourceContent.value,
        ],
        operation: [
          getAllContentObjectsOperation.value,
        ],
      },
    },
  },
  ...getContentKeysParameters(),
];
