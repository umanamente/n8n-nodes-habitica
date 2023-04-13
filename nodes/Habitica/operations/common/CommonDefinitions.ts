import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export interface IResourceOperationDef {
	operation: INodePropertyOptions;
	parameters: INodeProperties[];
};

export interface IResourceDef {
	resource: INodePropertyOptions;
	operationDefs: IResourceOperationDef[];
};

export function getAllResourceNodeParameters(resourceDef: IResourceDef) : INodeProperties[] {

	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	const operationNodeProperties  : INodeProperties = {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: resourceDef.operationDefs[0].operation.value,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					resourceDef.resource.value,
				],
			},
		},
		options: resourceDef.operationDefs.map((operationDef) => operationDef.operation),
	};

	var allParameters: INodeProperties[] = [
		// operation
		operationNodeProperties,

		// related parameters
		...resourceDef.operationDefs.map((operationDef) => operationDef.parameters).flat(),
	];

	return allParameters;
};
