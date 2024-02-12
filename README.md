# <img src="nodes/Habitica/habitica-icon.svg"  height="40"> n8n-nodes-habitica

This is an n8n community node. It lets you use [Habitica](https://habitica.com) in your n8n workflows.

Habitica is a free habit and productivity app that treats your real life like a game.   
Earn points, unlock gear, and find motivation to keep going.

## Table of Contents

* [Contributing](#contributing)  
* [Installation](#installation)  
* [Supported Triggers](#supported-triggers)  
* [Supported Operations](#supported-operations)  
* [Credentials](#credentials)  
  * [Executing arbitrary Habitica API requests](#executing-arbitrary-habitica-api-requests)
* [Version history](CHANGELOG.md)

## Contributing

Please read the [contributing guidelines](CONTRIBUTING.md).

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Supported Triggers

* User activity
  * Pet hatched
  * Pet fed
  * Level up
* Quest activity
  * Invited to quest
  * Quest started
  * Quest finished
* Group chat activity
  * New chat message
* Task activity
  * Task created
  * Task updated
  * Task deleted
  * Task scored


## Supported Operations

* Tasks
  * Add a task
  * Get all tasks
  * Score a task
  * Create a checklist item
  * Score a checklist item
* Skills (Spells)
  * Cast a skill
* User
  * Get user profile info
  * Get items available for purchase
  * Buy a Health Potion
  * Equip or unequip an item
* Chat messages
  * Send a chat message
  * Get all chat messages
  * Mark all chat messages as read
  * Like a chat message
  * Report a chat message
  * Delete a chat message
* Inbox
  * Get all inbox messages
  * Send a private message
* Quests
  * Accept a quest
  * Foprce-start a pending quest
  * Invite users to a quest
* Groups
  * Get all groups
  * Get members of a group
  * Get Group Info
* Content
  * Get all content
  * Get game world state
* Cron
  * Run cron


## Credentials

This node uses Habitica API credentials: **User ID** and **API Token**. 

You can find the credentials in the [Habitica settings](https://habitica.com/user/settings/api).

### Executing arbitrary Habitica API requests

You can use your N8N Habitica credentials with **"HTTP Request"** node to execute arbitrary Habitica API requests.

1. Add "HTTP Request" node to your workflow.
2. Select appropriate method (GET, POST, PUT, DELETE) in the "Method" field.
3. Enter the URL of the Habitica API endpoint you want to use (e.g. `https://habitica.com/api/v3/tasks/user` to get all user tasks).
4. In "Authentication" select your existing Habitica credentials.
5. (Optional) Use `Send Query Parameters` and `Send Body` fields if needed by the API method you are using.

> Note: Use appropriate HTTP method (GET, POST, PUT, DELETE) for your request. It is specified in the [Habitica API documentation](https://habitica.com/apidoc/).
