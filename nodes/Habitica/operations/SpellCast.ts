import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

// enum with spell classes: Mage, Warrior, Rogue, Healer, Transformation Items
export enum SpellClass {
	Mage = 'Mage',
	Warrior = 'Warrior',
	Rogue = 'Rogue',
	Healer = 'Healer',
	TransformationItems = 'Transformation Items'
}

// target type: self, party, user, task
export enum TargetType {
	PartyMember = 'Party Member',
	Task = 'Task',
	Self = 'Self',
	Party = 'Party',
}

export interface ISpellDefinition {
	displayName: string;
	name: string;
	spellClass: SpellClass;
	targetType: TargetType;
	// Target ID is required for task and party member targets
	targetIdRequired: boolean;
};

/*
Skill Key to Name Mapping  (https://habitica.com/apidoc/#api-User-UserCast)

Mage: fireball="Burst of Flames", mpheal="Ethereal Surge", earth="Earthquake", frost="Chilling Frost"
Warrior: smash="Brutal Smash", defensiveStance="Defensive Stance", valorousPresence="Valorous Presence", intimidate="Intimidating Gaze"
Rogue: pickPocket="Pickpocket", backStab="Backstab", toolsOfTrade="Tools of the Trade", stealth="Stealth"
Healer: heal="Healing Light", protectAura="Protective Aura", brightness="Searing Brightness", healAll="Blessing"
Transformation Items: snowball="Snowball", spookySparkles="Spooky Sparkles", seafoam="Seafoam", shinySeed="Shiny Seed"
*/

export const spellDefinitions: ISpellDefinition[] = [
	// Mage
	{
		displayName: 'Burst of Flames',
		name: 'fireball',
		spellClass: SpellClass.Mage,
		targetType: TargetType.Task,
		targetIdRequired: true,
	},
	{
		displayName: 'Ethereal Surge',
		name: 'mpheal',
		spellClass: SpellClass.Mage,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	{
		displayName: 'Earthquake',
		name: 'earth',
		spellClass: SpellClass.Mage,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	{
		displayName: 'Chilling Frost',
		name: 'frost',
		spellClass: SpellClass.Mage,
		targetType: TargetType.Self,
		targetIdRequired: false,
	},
	// Warrior
	{
		displayName: 'Brutal Smash',
		name: 'smash',
		spellClass: SpellClass.Warrior,
		targetType: TargetType.Task,
		targetIdRequired: true,
	},
	{
		displayName: 'Defensive Stance',
		name: 'defensiveStance',
		spellClass: SpellClass.Warrior,
		targetType: TargetType.Self,
		targetIdRequired: false,
	},
	{
		displayName: 'Valorous Presence',
		name: 'valorousPresence',
		spellClass: SpellClass.Warrior,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	{
		displayName: 'Intimidating Gaze',
		name: 'intimidate',
		spellClass: SpellClass.Warrior,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	// Rogue
	{
		displayName: 'Pickpocket',
		name: 'pickPocket',
		spellClass: SpellClass.Rogue,
		targetType: TargetType.Task,
		targetIdRequired: true,

	},
	{
		displayName: 'Backstab',
		name: 'backStab',
		spellClass: SpellClass.Rogue,
		targetType: TargetType.Task,
		targetIdRequired: true,
	},
	{
		displayName: 'Tools of the Trade',
		name: 'toolsOfTrade',
		spellClass: SpellClass.Rogue,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	{
		displayName: 'Stealth',
		name: 'stealth',
		spellClass: SpellClass.Rogue,
		targetType: TargetType.Self,
		targetIdRequired: false,
	},
	// Healer
	{
		displayName: 'Healing Light',
		name: 'heal',
		spellClass: SpellClass.Healer,
		targetType: TargetType.Self,
		targetIdRequired: false,
	},
	{
		displayName: 'Protective Aura',
		name: 'protectAura',
		spellClass: SpellClass.Healer,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	{
		displayName: 'Searing Brightness',
		name: 'brightness',
		spellClass: SpellClass.Healer,
		targetType: TargetType.Self,
		targetIdRequired: false,
	},
	{
		displayName: 'Blessing',
		name: 'healAll',
		spellClass: SpellClass.Healer,
		targetType: TargetType.Party,
		targetIdRequired: false,
	},
	// Transformation Items (special events only): https://habitica.fandom.com/wiki/Transformation_Items
	{
		displayName: 'Snowball',
		name: 'snowball',
		spellClass: SpellClass.TransformationItems,
		targetType: TargetType.PartyMember,
		targetIdRequired: true,
	},
	{
		displayName: 'Spooky Sparkles',
		name: 'spookySparkles',
		spellClass: SpellClass.TransformationItems,
		targetType: TargetType.PartyMember,
		targetIdRequired: true,
	},
	{
		displayName: 'Seafoam',
		name: 'seafoam',
		spellClass: SpellClass.TransformationItems,
		targetType: TargetType.PartyMember,
		targetIdRequired: true,
	},
	{
		displayName: 'Shiny Seed',
		name: 'shinySeed',
		spellClass: SpellClass.TransformationItems,
		targetType: TargetType.PartyMember,
		targetIdRequired: true,
	},
];


export const spellCastOperation: INodePropertyOptions =
{
	// "Spells" should be called "Skills" in the UI
	name: 'Cast Skill',
	value: 'spellCast',
	action: 'Cast Skill (Spell)',
	routing: {
		request: {
			method: 'POST',
			// https://habitica.com/api/v3/user/class/cast/:spellId
			url: '=user/class/cast/{{{{$parameter.spellId}}}}',
		},
		output: {
			postReceive: [
				// response is in "data" property
				{
					type: 'rootProperty',
					properties: {
						property: 'data',
					},
				},

			],
		},
	},
};

export const spellCastParameters: INodeProperties[] = [
	// select class
	/*{
		displayName: 'Skill Class',
		name: 'skillClass',
		type: 'options',
		placeholder: 'Select Skill Class',
		default: 'Mage',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Mage',
				value: SpellClass.Mage,
			},
			{
				name: 'Warrior',
				value: SpellClass.Warrior,
			},
			{
				name: 'Rogue',
				value: SpellClass.Rogue,
			},
			{
				name: 'Healer',
				value: SpellClass.Healer,
			},
			{
				name: 'Transformation Items',
				value: SpellClass.TransformationItems,
			},
		],
	},
	*/
	// select spell
	{
		displayName: 'Skill Name',
		name: 'spellId',
		type: 'options',
		placeholder: 'Select Skill Name',
		default: '',
		// map spellDefinitions to options
		options: spellDefinitions.map(function (spellDefinition) {
			  // display target type for spells that require a Task or Party Member target
				/*var targetDesctiption = "";
				switch (spellDefinition.targetType) {
					case TargetType.Task:
						targetDesctiption = " (Cast on Task)";
						break;
					case TargetType.PartyMember:
						targetDesctiption = " (Cast on Party Member)";
						break;
				}*/
				return ({
					name: "[" + spellDefinition.spellClass + "] " + spellDefinition.displayName + " (Cast on "+ spellDefinition.targetType + ")",
					value: spellDefinition.name,
				});
			}),
	},
	// for spells that require a task target
	{
		displayName: 'Task',
		name: 'taskId',
		type: 'options',
		placeholder: 'Select task to cast skill on',
		default: '',
		// map spellDefinitions to options
		options: spellDefinitions.map(spellDefinition => ({
			name: spellDefinition.displayName,
			value: spellDefinition.name,
		})),
		// only display for spells that require a task target
		displayOptions: {
			show: {
				spellId: spellDefinitions.filter(
					spellDefinition => spellDefinition.targetType === TargetType.Task
				).map(spellDefinition => spellDefinition.name),
				},
			},
	},
];

