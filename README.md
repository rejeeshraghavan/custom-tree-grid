# Salesforce lwc Custom Tree Grid

This lwc component can be used to show nested tables. Unlike the standard Tree Grid component, the child & parent tables can have different column names.

## Features
- Different column names for parent table & child table
- Add/Edit parent & child rows.

## Installation

<a href="https://githubsfdeploy.herokuapp.com?owner=rejeeshraghavan&repo=custom-tree-grid">
<img alt="Deploy to Salesforce"
   src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png">
</a>

## Usage
```html
<template>
    <c-custom-tree-grid
        if:true={gridData}
        parent-columns={parentColumns}
        child-columns={childColumns}
        grid-data={gridData}
        edit-mode-enabled
        child-relationship-name={childRelationshipName}
        parent-object-api-name={objectApiName}
        child-object-api-name={childObjectApiName}
        ondatachange={handleDataChange}>
    </c-custom-tree-grid>
</template>
```
for more detailed examples refer `accountGridLwc` or `OpportunityGridLwc` components.

### Attributes
| Name | Description |
| --- | --- |
| parent-columns | Array of the parent columns parent object that's used to define the data types. Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'. |
| child-columns | Array of the columns child object that's used to define the data types. Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'. |
| grid-data | The array of data to be displayed. |
| child-relationship-name | The API name of child object relationship. |
| edit-mode-enabled | If present, edit mode is enabled. |
| parent-object-api-name | The API Name of parent object. This is required if edit mode is enabled.|
| child-object-api-name | The API Name of child object. This is required if edit mode is enabled. |

### Methods
| Name | Description |
| --- | --- |
| refreshGrid | Use this method to refresh data passed into the component. |

### Custom Events
| Name | Description |
| --- | --- |
| ondatachange | The event fired when underlying data is changed. Use this event to invoke refreshGrid method. See detailed implementation in handleDataChange method of  `accountGridLwc` component. |


## Screenshots

### View Only Grid

![View Only Grid Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/view-only-grid.png?raw=true)

### Edit Enabled Grid

![View Only Grid Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/editable-gird.png?raw=true)

### Parent Row Edit Action

![Parent Row Edit Action Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/parent-row-edit.png?raw=true)

### Child Row Edit Action

![Child Row Edit Action Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/child-row-edit.png?raw=true)

