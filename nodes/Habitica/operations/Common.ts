import { IDataObject, IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions, INodeListSearchResult, JsonObject, NodeApiError } from "n8n-workflow";
import { OptionsWithUri } from "request";

export type Context = IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions;

export async function habiticaApiRequest(
	this: Context,
	method: string = 'POST',
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	this.logger.debug(`Calling Habitica API: ${resource}`);
	const authentication = this.getNodeParameter('authentication', 0) as string;

	// todo: get this from node parameters
	const endpoint = 'habitica.com/api/v3/';

	const options: OptionsWithUri = {
		method,
		qs,
		uri: `https://${endpoint}${resource}`,
		json: true,
	};

	if (Object.keys(body).length !== 0) {
		options.body = body;
	}

	try {
		const credentialType = authentication === 'apiKey' ? 'todoistApi' : 'todoistOAuth2Api';
		return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}


export async function taskSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	//const query: string[] = [];
	/*if (filter) {
		query.push(`name contains '${filter.replace("'", "\\'")}'`);
	}*/
	//query.push("mimeType = 'application/vnd.google-apps.folder'");
	const tasks = await habiticaApiRequest.call(this, 'POST', 'tasks/user', undefined, {
		//q: query.join(' and '),
		//pageToken: paginationToken,
		//fields: 'nextPageToken,files(id,name,mimeType,webViewLink)',
		//orderBy: 'name_natural',
	});
	return {
		results: tasks.map((project: IDataObject) => ({
			name: project.name,
			value: project.id,
		})),
	};
}
