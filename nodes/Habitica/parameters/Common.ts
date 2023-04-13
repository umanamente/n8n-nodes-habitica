import { INodePropertyModeValidation } from "n8n-workflow";
import { AUTHOR_ID } from "../../../credentials/HabiticaApi.credentials";

export const validationGuidRegex : INodePropertyModeValidation = {
	type: 'regex',
	properties: {
		regex: "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}",
		errorMessage: 'The ID must look like this: "' + AUTHOR_ID + '"',
	},
};
