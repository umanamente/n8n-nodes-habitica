import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/*
This causes cron to run.
It assumes that the user has already been shown the
Record Yesterday's Activity ("Check off any Dailies you did yesterday") screen
and so it will immediately apply damage for incomplete due Dailies.
*/
export const cronRunOperation: INodePropertyOptions =
{
	name: 'Run Cron',
	value: 'runCron',
	action: 'Run Cron',
	description: 'This causes cron to run',
	routing: {
		request: {
			method: 'POST',
			url: '=cron',
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

export const cronRunParameters: INodeProperties[] = [
	// no parameters
];

