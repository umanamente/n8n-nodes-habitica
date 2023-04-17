import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { resourceTask } from "../ResourceName";

export const createUserTaskOperation: INodePropertyOptions =
{
	name: 'Create Task',
	value: 'createTask',
	action: 'Create Task',
	routing: {
		request: {
			method: 'POST',
			url: '=tasks/user',
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

/*const daysOfWeek = [
	{
		name: 'Sunday',
		value: 'su',
	},
	{
		name: 'Monday',
		value: 'm',
	},
	{
		name: 'Tuesday',
		value: 't',
	},
	{
		name: 'Wednesday',
		value: 'w',
	},
	{
		name: 'Thursday',
		value: 'th',
	},
	{
		name: 'Friday',
		value: 'f',
	},
	{
		name: 'Saturday',
		value: 's',
	},
];*/

export const createUserTaskParameters: INodeProperties[] = [
	// string: Task Caption (aka "text")
	{
		displayName: 'Task Caption',
		name: 'text',
		type: 'string',
		default: '',
		description: 'The text of the task',
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				]
			}
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			}
		},
	},
	{
		displayName: 'Task Type',
		name: 'type',
		type: 'options',
		default: 'habit',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Habit',
				value: 'habit',
			},
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Todo',
				value: 'todo',
			},
			{
				name: 'Reward',
				value: 'reward',
			},
		],
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				]
			}
		},
		routing: {
			send: {
				type: 'body',
				property: 'type',
			}
		},
	},


	// fields for "habit" type
	// up: Only valid for type "habit" If true, enables the "+" under "Directions/Action" for "Good habits"
	{
		displayName: 'Up',
		name: 'up',
		type: 'boolean',
		default: false,
		description: 'Whether the habit is a good habit or not',
		routing: {
			send: {
				type: 'body',
				property: 'up',
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'habit',
				],
			},
		},
	},
	// down: Only valid for type "habit" If true, enables the "-" under "Directions/Action" for "Bad habits"
	{
		displayName: 'Down',
		name: 'down',
		type: 'boolean',
		default: false,
		description: 'Whether the habit is a bad habit or not',
		routing: {
			send: {
				type: 'body',
				property: 'down',
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'habit',
				],
			},
		},
	},


	// fields for "reward" type
	// value: Only valid for type "reward" The amount of gold the reward is worth
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		default: 0,
		description: 'The amount of gold the reward is worth',
		routing: {
			send: {
				type: 'body',
				property: 'value',
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'reward',
				],
			},
		},
	},


	// fields for "daily" type

	// frequency -"daily", "weekly", "monthly", "yearly" (default "weekly")
	// Values "weekly" and "monthly" enable use of the "repeat" field.
	// All frequency values enable use of the "everyX" field.
	// Value "monthly" enables use of the "weeksOfMonth" and "daysOfMonth" fields.
	// Frequency is only valid for type "daily".
	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'options',
		default: 'weekly',
		description: 'The frequency of the task',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Weekly',
				value: 'weekly',
			},
			{
				name: 'Monthly',
				value: 'monthly',
			},
			{
				name: 'Yearly',
				value: 'yearly',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'frequency',
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'daily',
				],
			},
		},
	},


	// repeat: List of objects for days of the week, Days that are true will be repeated upon.
	// Only valid for type "daily". Any days not specified will be marked as true.
	// Days are: su, m, t, w, th, f, s.
	// Value of frequency must be "weekly".
	// For example, to skip repeats on Mon and Fri: "repeat":{"f":false,"m":false}

	// TODO: not supported (not clearly documented)

	/*{
		displayName: 'Repeat',
		name: 'repeat',
		type: 'multiOptions',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-multi-options
		default: daysOfWeek.map(day => day.value),
		description: 'Days that are true will be repeated upon',
		// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
		options: daysOfWeek,
		routing: {
			send: {
				type: 'body',
				property: 'repeat',
				// object with string keys and boolean values
				value: "={{  Object.fromEntries(['su', 'm', 't', 'w', 'th', 'f', 's'].map(day => [day, $parameters['repeat'].includes(day)]))  }}",
			}
		},
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'daily',
				],
				frequency: [
					'weekly',
				],
			},
		},
	},*/







	// optional fields
	{
		displayName: "Optional Fields",
		name: "optionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		options: [
			// string: Task Notes
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Extra notes for the task',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					}
				},
			},

			// priority - Difficulty, options are 0.1, 1, 1.5, 2; equivalent of Trivial, Easy, Medium, Hard.
			{
				displayName: 'Difficulty',
				name: 'difficulty',
				type: 'options',
				default: '1',
				description: 'The difficulty of the task',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Trivial',
						value: '0.1',
					},
					{
						name: 'Easy',
						value: '1',
					},
					{
						name: 'Medium',
						value: '1.5',
					},
					{
						name: 'Hard',
						value: '2',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'priority',
					}
				},
			},
			// attribute: User's attribute to use, options are: "str", "int", "per", "con"
			{
				displayName: 'Attribute',
				name: 'attribute',
				type: 'options',
				default: 'str',
				description: "User's attribute to use",
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Strength',
						value: 'str',
					},
					{
						name: 'Intelligence',
						value: 'int',
					},
					{
						name: 'Perception',
						value: 'per',
					},
					{
						name: 'Constitution',
						value: 'con',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'attribute',
					}
				},
			},


			// string: alias
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
				description: 'Alias to assign to task',
				routing: {
					send: {
						type: 'body',
						property: 'alias',
					}
				},
			},



		],
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				]
			}
		},
	},
	// optional fields for "todo" type
	{
		displayName: "Optional Fields for Todo Type",
		name: "optionalFieldsTodo",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		options: [
			// date: Task Due Date (Only valid for type "todo")
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'The date the task is due',
				routing: {
					send: {
						type: 'body',
						property: 'date',
					}
				},
			},
		],
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'todo',
				],
			}
		},
	},
	// optional fields for "daily" type
	{
		displayName: "Optional Fields for Daily Type",
		name: "optionalFieldsDaily",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		options: [
			// everyX
			{
				displayName: 'Every X',
				name: 'everyX',
				type: 'number',
				default: 1,
				description: 'The number of days/months/years between each task',
				routing: {
					send: {
						type: 'body',
						property: 'everyX',
					}
				},
			},

			// streak: Number of days that the task has consecutively been checked off. Only valid for type "daily"
			{
				displayName: 'Streak',
				name: 'streak',
				type: 'number',
				default: 0,
				description: 'The number of days that the task has consecutively been checked off',
				routing: {
					send: {
						type: 'body',
						property: 'streak',
					}
				},
			},

			// startDate: Date when the task will first become available. Only valid for type "daily"
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'The date the task will first become available',
				routing: {
					send: {
						type: 'body',
						property: 'startDate',
					}
				},
			},
		],
		displayOptions: {
			show: {
				resource: [
					resourceTask.value,
				],
				operation: [
					createUserTaskOperation.value,
				],
				type: [
					'daily',
				],
			}
		},
	},



];

