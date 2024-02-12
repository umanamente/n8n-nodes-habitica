import { IResourceDef } from "../common/CommonDefinitions";
import { resourceUser } from "./ResourceName";
import { buyHealthPotionsOperation, buyHealthPotionsParameters } from "./functions/UserBuyHealthPotion";
import { equipItemOperation, equipItemParameters } from "./functions/UserEquipItem";
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
		},
		{
			operation: buyHealthPotionsOperation,
			parameters: buyHealthPotionsParameters,
		},
		{
			operation: equipItemOperation,
			parameters: equipItemParameters,
		}
	],
};
