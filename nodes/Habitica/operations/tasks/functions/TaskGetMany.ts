import {
  IExecuteSingleFunctions,
  IN8nHttpFullResponse,
  INodeExecutionData,
  INodeProperties,
  INodePropertyOptions,
} from 'n8n-workflow';
import { resourceTask } from '../ResourceName';

export const getAllTasksOperation: INodePropertyOptions = {
  name: 'Get Many',
  value: 'getAll',
  action: 'Get many tasks',
  description: 'Get all tasks for the user',
  routing: {
    request: {
      method: 'GET',
      url: '=tasks/user',
    },
    output: {
      postReceive: [
        // tasks are in "data" property
        {
          type: 'rootProperty',
          properties: {
            property: 'data',
          },
        },
        // apply filters
        filterTasks,
      ],
    },
  },
};

const showOptions = {
  resource: [resourceTask.value],
  operation: [getAllTasksOperation.value],
};

export const getAllTasksParameters: INodeProperties[] = [
  {
    displayName: 'All Types of Tasks',
    name: 'allTypes',
    type: 'boolean',
    default: true,
    description: 'Whether to get all types: daily, todo, habit and rewards tasks',
    displayOptions: {
      show: {
        ...showOptions,
      },
    },
  },
  {
    displayName: 'Task Type',
    name: 'taskType',
    type: 'options',
    placeholder: 'All tasks',
    default: 'habits',
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: 'Habits',
        value: 'habits',
      },
      {
        name: 'Dailys',
        value: 'dailys',
      },
      {
        name: 'Todos',
        value: 'todos',
      },
      {
        name: 'Rewards',
        value: 'rewards',
      },
      {
        name: 'Completed Todos',
        value: 'completedTodos',
      },
    ],
    displayOptions: {
      show: {
        ...showOptions,
      },
      hide: {
        allTypes: [true],
      },
    },
    routing: {
      send: {
        type: 'query',
        property: 'type',
      },
    },
  },

  // filter options
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        ...showOptions,
      },
    },
    options: [
      {
        displayName: 'Text Contains',
        name: 'textContains',
        type: 'collection',
        default: {
          value: '',
          caseSensitive: false,
          useRegex: false,
        },
        description: 'Filter tasks by text containing the given string (case insensitive)',
        options: [
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',                        
          },
          {
            displayName: 'Case Sensitive',
            name: 'caseSensitive',
            type: 'boolean',
            default: false,
            description: 'Whether the search should be case sensitive',
          },
          {
            displayName: 'Use Regex',
            name: 'useRegex',
            type: 'boolean',
            default: false,
            description: 'Whether to treat the value as a regular expression',
          },
        ],
      },
      {
        displayName: 'Notes Contain',
        name: 'notesContains',
        type: 'collection',
        default: {
          value: '',
          caseSensitive: false,
          useRegex: false,
        },
        description: 'Filter tasks by notes containing the given string',
        options: [
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Case Sensitive',
            name: 'caseSensitive',
            type: 'boolean',
            default: false,
            description: 'Whether the search should be case sensitive',
          },
          { 
            displayName: 'Use Regex',
            name: 'useRegex',
            type: 'boolean',
            default: false,
            description: 'Whether to treat the value as a regular expression',
          },
        ],
      },
    ],
  },

  // remove fields option
  {
    displayName: 'Remove Fields',
    name: 'removeFields',
    type: 'multiOptions',
    default: [],
    description: 'Whether to remove certain fields from the tasks',
    displayOptions: {
      show: {
        ...showOptions,
      },
    },
    options: [
      {
        name: 'Challenge',
        value: 'challenge',
      },
      {
        name: 'Checklist',
        value: 'checklist',
      },
      {
        name: 'Group',
        value: 'group',
      },
      {
        name: 'History',
        value: 'history',
      },
      {
        name: 'Reminders',
        value: 'reminders',
      },
      {
        name: 'Tags',
        value: 'tags',
      },
    ],
  },
];

interface TextFilterOptions {
  value: string;
  caseSensitive: boolean;
  useRegex: boolean;
}

interface TaskFilters {
  textContains?: TextFilterOptions;
  notesContains?: TextFilterOptions;
}


// helper function to filter items by text or notes property
function filterByTextProperty(
  items: INodeExecutionData[],
  property: 'text' | 'notes',
  filter: TextFilterOptions
): INodeExecutionData[] {
  const { value, caseSensitive, useRegex } = filter;
  const filterLower = value.toLowerCase();

  let regex: RegExp | undefined;
  if (useRegex) {
    const flags = caseSensitive ? '' : 'i';
    try {
      regex = new RegExp(value, flags);
    } catch (error) {
      // Handle invalid regex
      throw new Error(`Invalid regular expression for filtering '${property}': ${error.message}`);
    }
  }

  return items.filter((item) => {
    const text = item.json[property];
    if (typeof text !== 'string') {
      return false;
    }
    if (useRegex && regex) {
      return regex.test(text);
    }
    return (        
      (caseSensitive ? text.includes(filterLower) : text.toLowerCase().includes(filterLower))
    );
  });
}

// main filter function
async function filterTasks(
  this: IExecuteSingleFunctions,
  items: INodeExecutionData[],
  response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
  
  // apply filters
  const filters = this.getNodeParameter('filters', 0) as TaskFilters;
  
  if (filters.textContains && filters.textContains.value) {
    items = filterByTextProperty(items, 'text', filters.textContains);
  }

  if (filters.notesContains && filters.notesContains.value) {
    items = filterByTextProperty(items, 'notes', filters.notesContains);
  }

  // exclude fields
  const removeFields = this.getNodeParameter('removeFields', 0) as string[];
  if (removeFields.length > 0) {
    items = items.map((item) => {
      for (const field of removeFields) {
        try {
          delete item.json[field];
        } catch (error) {
          // Handle error if needed
        }
      }
      return item;
    });
  }

  return items;
}