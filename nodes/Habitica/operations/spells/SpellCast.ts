import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { parameterSelectTask } from "../../parameters/ParameterSelectTask";
import { parameterSelectUserPartyMember } from '../../parameters/ParameterSelectPartyMember';

// enum with spell classes: Mage, Warrior, Rogue, Healer, Transformation Items
export enum SpellClass {
	Mage = 'Mage',
	Warrior = 'Warrior',
	Rogue = 'Rogue',
	Healer = 'Healer',
	TransformationItems = 'Transformation Items'
}

// wiki pages for each class spells (https://habitica.fandom.com/wiki/Class_System)
export const spellClassWikiPages: { [key in SpellClass]: string } = {
	[SpellClass.Mage]: 'https://habitica.fandom.com/wiki/Mage',
	[SpellClass.Warrior]: 'https://habitica.fandom.com/wiki/Warrior',
	[SpellClass.Rogue]: 'https://habitica.fandom.com/wiki/Rogue',
	[SpellClass.Healer]: 'https://habitica.fandom.com/wiki/Healer',
	[SpellClass.TransformationItems]: 'https://habitica.fandom.com/wiki/Transformation_Items',
};

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


// TODO: this could be generated on build-time from https://habitica.com/api/v3/content
// TODO: add description for each spell

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
	name: 'Apply Skill',
	value: 'spellCast',
	action: 'Apply Skill (Cast Spell)',
	routing: {
		request: {
			method: 'POST',
			// https://habitica.com/api/v3/user/class/cast/:spellId
			url: '=user/class/cast/{{$parameter.spellId}}',
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
	// select spell
	{
		displayName: 'Skill Name',
		name: 'spellId',
		type: 'options',
		placeholder: 'Select Skill Name',
		default: '',
		// map spellDefinitions to options
		options: spellDefinitions.map(function (spellDefinition) {
			//const spellWikiPageLink = spellClassWikiPages[spellDefinition.spellClass] + "#" + spellDefinition.displayName.replace(/ /g, "_");
			return ({
				name: "[" + spellDefinition.spellClass + "] " + spellDefinition.displayName + " (Cast on "+ spellDefinition.targetType + ")",
				value: spellDefinition.name,
				// description: spellWikiPageLink,
			});
		}),
		displayOptions: {
			show: {
				resource: [
					'spell',
				],
				operation: [
					'spellCast',
				],
			},
		},
	},
	// for spells that require a task target
	{
		...parameterSelectTask,
		description: 'Select task to cast skill on',
		routing: {
			send: {
				type: 'query',
				property: 'targetId',
			}
		},
		// only display for spells that require a task target
		displayOptions: {
			show: {
				operation: [
					'spellCast',
				],
				resource: [
					'spell',
				],
				spellId: spellDefinitions.filter(
					spellDefinition => spellDefinition.targetType === TargetType.Task
				).map(spellDefinition => spellDefinition.name),
			},
		},
	},
	// for spells that require a party member target
	{
		...parameterSelectUserPartyMember,
		description: 'Select party member to cast skill on',
		routing: {
			send: {
				type: 'query',
				property: 'targetId',
			}
		},
		// only display for spells that require a party member target
		displayOptions: {
			show: {
				operation: [
					'spellCast',
				],
				resource: [
					'spell',
				],
				spellId: spellDefinitions.filter(
					spellDefinition => spellDefinition.targetType === TargetType.PartyMember
				).map(spellDefinition => spellDefinition.name),
			},
		},
	},


];

