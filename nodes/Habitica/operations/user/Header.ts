import { IResourceDef } from "../common/CommonDefinitions";
import { resourceUser } from "./ResourceName";
import { getUserProfileInfoOperation, getUserProfileInfoParameters } from "./functions/UserGetProfileInfo";

export const userResourceDefinitions: IResourceDef = {
	resource: resourceUser,
	operationDefs: [
		{
			operation: getUserProfileInfoOperation,
			parameters: getUserProfileInfoParameters,
		},
	],
};
