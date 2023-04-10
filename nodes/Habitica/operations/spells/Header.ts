import { INodeProperties } from "n8n-workflow";
import { spellCastOperation, spellCastParameters } from "./SpellCast";
import { resourceSpell } from "../../definitions/HabiticaNodeResources";

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
const spellOperations : INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: spellCastOperation.value,
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				resourceSpell.value,
			],
		},
	},
	options: [
		spellCastOperation
	],
};

export const spellParameters: INodeProperties[] = [
	// operation
	spellOperations,

	// related parameters
	...spellCastParameters,
];
