import { IResourceDef } from "../common/CommonDefinitions";
import { resourceGroup } from "./ResourceName";
import { getGroupMembersOperation, getGroupMembersParameters } from "./functions/GroupGetMembers";

export const groupResourceDefinitions: IResourceDef = {
	resource: resourceGroup,
	operationDefs: [
		{
			operation: getGroupMembersOperation,
			parameters: getGroupMembersParameters,
		},
	],
};


