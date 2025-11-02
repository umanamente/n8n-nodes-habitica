import { IDataObject, IExecuteFunctions, IHookFunctions, IHttpRequestMethods, IHttpRequestOptions, ILoadOptionsFunctions, JsonObject, NodeApiError } from "n8n-workflow";

export const HABITICA_API_BASE_URL = 'https://habitica.com/api/v3/';

export type Context = IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions;

export async function habiticaApiRequest(
  this: Context,
  method: IHttpRequestMethods,
  resource: string,
  body: IDataObject = {},
  qs: IDataObject = {},
): Promise<any> {
  const credentials = await this.getCredentials('habiticaApi');  
  const habiticaApiBaseUrl = credentials.useSelfHosted ? credentials.apiBaseUrl : HABITICA_API_BASE_URL;

  const options: IHttpRequestOptions = {    
    method,
    qs,
    url: `${habiticaApiBaseUrl}${resource}`,
    json: true,
  };

  if (Object.keys(body).length !== 0) {
    options.body = body;
  }
  this.logger.debug(`Calling Habitica API: ${resource}, options: ${JSON.stringify(options)}`);


  try {
    const resp = await this.helpers.httpRequestWithAuthentication.call(this, "habiticaApi", options);
    if (resp.success === false) {
      throw new Error(`Habitica error response [${resource}]: ${JSON.stringify(resp)}`);
    } else {
      return resp.data;
    }
  } catch (error) {
    this.logger.error(`Habitica error response [${resource}]: ${JSON.stringify(error)}`);
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }
}

