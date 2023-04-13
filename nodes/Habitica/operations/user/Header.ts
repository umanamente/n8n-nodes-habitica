import { IResourceDef } from "../common/CommonDefinitions";
import { resourceUser } from "./ResourceName";
import { getUserProfileInfoOperation, getUserProfileInfoParameters } from "./functions/UserGetProfileInfo";
import { getUserShopItemsOperation, getUserShopItemsParameters } from "./functions/UserGetShopItems";

export const userResourceDefinitions: IResourceDef = {
	resource: resourceUser,
	operationDefs: [
		{
			operation: getUserProfileInfoOperation,
			parameters: getUserProfileInfoParameters,
		},
		{
			operation: getUserShopItemsOperation,
			parameters: getUserShopItemsParameters,
		}
	],
};
