import { spellCastOperation, spellCastParameters } from "./functions/SpellCast";
import { resourceSpell } from "./ResourceName";
import { IResourceDef } from "../common/CommonDefinitions";

export const spellsResourceDefinitions: IResourceDef = {
	resource: resourceSpell,
	operationDefs: [
		{
			operation: spellCastOperation,
			parameters: spellCastParameters,
		},
	],
};

