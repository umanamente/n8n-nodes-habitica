import { IResourceDef } from "../common/CommonDefinitions";
import { resourceGroup } from "./ResourceName";
import { groupGetInfoOperation, groupGetInfoParameters } from "./functions/GroupGetInfo";
import { getManyGroupsOperation, getManyGroupsParameters } from "./functions/GroupGetMany";
import { getGroupMembersOperation, getGroupMembersParameters } from "./functions/GroupGetMembers";

export const groupResourceDefinitions: IResourceDef = {
	resource: resourceGroup,
	operationDefs: [
		{
			operation: getGroupMembersOperation,
			parameters: getGroupMembersParameters,
		},
		{
			operation: getManyGroupsOperation,
			parameters: getManyGroupsParameters,
		},
		{
			operation: groupGetInfoOperation,
			parameters: groupGetInfoParameters,
		}
	],
};


