import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { resourceContent } from "../ResourceName";

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
];
