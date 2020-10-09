# Salesforce lwc Custom Tree Grid

This lwc component can be used to show nested tables. Unlike the standard Tree Grid component, the child & parent tables can have different column names.

## Features
- Different column names for parent table & child table
- Add/Edit parent & child rows.

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


## Screenshots

### View Only Grid

![View Only Grid Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/view-only-grid.png?raw=true)

### Edit Enabled Grid

![View Only Grid Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/editable-gird.png?raw=true)

### Parent Row Edit Action

![Parent Row Edit Action Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/parent-row-edit.png?raw=true)

### Child Row Edit Action

![Child Row Edit Action Screenshot](https://github.com/rejeeshraghavan/custom-tree-grid/blob/master/assets/child-row-edit.png?raw=true)

