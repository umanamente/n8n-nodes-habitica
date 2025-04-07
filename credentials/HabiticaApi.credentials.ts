import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';
import { HABITICA_API_BASE_URL } from '../nodes/Habitica/common/HabiticaApiRequest';

export const AUTHOR_ID = 'a1abf9df-d89d-4f5e-9e80-26dc3c481042';

export class HabiticaApi implements ICredentialType {
  name = 'habiticaApi';
  displayName = 'Habitica API';
  documentationUrl = 'https://habitica.com/user/settings/api';
  properties: INodeProperties[] = [
    {
      displayName: 'API User Token',
      name: 'apiUserToken',
      type: 'string',
      default: '',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
    },
    {
      displayName: 'Use self-hosted Habitica',
      name: 'useSelfHosted',
      type: 'boolean',
      default: false,
      description: 'Use this if you are using a self-hosted version of Habitica',
    },
    {
      displayName: 'API Base URL',
      name: 'apiBaseUrl',
      type: 'string',
      default: HABITICA_API_BASE_URL,      
      placeholder: HABITICA_API_BASE_URL,
      displayOptions: {
        show: {
          useSelfHosted: [true],
        },
      },
      description: 'The base URL of your self-hosted Habitica instance. For example: https://my-habitica-instance.com/api/v3/',        
    },
    // hidden AUTHOR_ID property
    {
      displayName: 'Author ID',
      name: 'authorId',
      default: AUTHOR_ID,
      type: 'hidden',
    },
    // hidden SCRIPT_NAME property
    {
      displayName: 'Script Name',
      name: 'scriptName',
      default: 'N8N Node',
      type: 'hidden',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'x-client' : "={{$credentials.authorId}} - {{$credentials.scriptName}}",
        'x-api-user' : '={{$credentials.apiUserToken}}',
        'x-api-key' : '={{$credentials.apiKey}}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: "={{$credentials.useSelfHosted ? $credentials.apiBaseUrl : '" + HABITICA_API_BASE_URL + "'}}",
      url: 'tags',
    },
  };

}
