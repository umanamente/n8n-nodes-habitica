import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

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
      baseURL: 'https://habitica.com/api/v3/',
      url: 'tags',
    },
  };

}
