This Readme file is for developers who want to contribute to this Habitica N8N Plugin. 

# Terms

* **Resource**: A resource is a type of data in Habitica. For example, `Task`, `User`, `Message`, etc.
* **Operation**: An operation is a function that can be used in a workflow. For example, the "`Get User`" operation is a function that can be used to get a user from Habitica. Operations are grouped by Resource.
* **Trigger**: A trigger is an event that Habitica can send to N8N. For example, a new task is created, a task is updated, etc.

# Adding a Resource

> WARNING: Most likely you don't need to add a new resource. Check if you can add a new [operation](#adding-an-operation-for-a-resource) into an existing resource.

1. Create a new folder in the `operations` folder.  
The name of the folder should be the name of the resource.  
For example, the folder for the `Task` related operations is called `task`.
2. Create a `ResourceName.ts` file in the new folder.  
Actually just copy it from another resource folder and change a couple of strings in the file. 
3. Create a `Header.ts` file in the new folder.  
This file contains the list of operations that are available for the resource.  
Operations related to the resource should be added to the `{RESOURCE}/functions` directory (each operation in its own file). Creating operations is explained in the next section.
4. Add the resource to the `OperationsHeader.ts` file in the `operations` folder.

# Adding an Operation for a Resource

1. Create a new file in the `{RESOURCE}/functions` directory.  
Naming convention is `{Resource}{OperationBriefDescr}.ts`.  
For example, the file for the "Get many tasks" operation is called `TaskGetMany.ts`.
2. This file should export 2 objects:  
   * `{operationBriefDescr}Operation: INodePropertyOptions` - the N8N operation property.  
   Refer to N8N documentation for more information about this property.
   * `{operationBriefDescr}Parameters: INodeProperties[]` - list of parameters for the operation.  
   Parameters are user to configure the operation.  
   For example, the "Create Task" operation has the following parameters:
     * `Task Caption` that is used to set the caption of the task that will be created, 
     * `Task Type` that is used to set the type of the task that will be created.
3. Add `operation` and `parameters` to the `Header.ts` file in the resource folder.

# Adding a Trigger

> All triggers that are provided by Habitica are already implemented in this plugin.  

> Adding a trigger is more complicated than adding an operation.
> If Habitica adds a new trigger, please [create an issue](https://github.com/umanamente/n8n-nodes-habitica/issues) first.

Triggers are located in the `triggers` folder (surprise!).

1. Create a new file in the `triggers` directory (or add events to an existing file).
2. Add new events to the `allEventDefinitions` array in the `Common.ts` file in the `triggers` folder.
