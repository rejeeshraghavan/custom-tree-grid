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
