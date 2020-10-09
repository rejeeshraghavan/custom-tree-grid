import { LightningElement, api, track, wire } from 'lwc';
import getAccountsWithContacts from '@salesforce/apex/GridController.getAccountsWithContacts';
import {refreshApex} from '@salesforce/apex';

const PARENT_COLUMNS = [
    {
        type: 'text',
        fieldName: 'Name',
        label: 'Account Name',
        initialWidth: 300,
        size: 3,
    },
    {
        type: 'number',
        fieldName: 'NumberOfEmployees',
        label: 'Employees',
        size: 2,
    },
    {
        type: 'phone',
        fieldName: 'Phone',
        label: 'Phone Number',
        size: 2,
    },
    {
        type: 'url',
        fieldName: 'Owner.FullPhotoUrl',
        label: 'Account Owner',
        size: 2,
        typeAttributes: {
            label: { fieldName: 'Owner.Name' },
        },
    },
    {
        type: 'text',
        fieldName: 'BillingCity',
        label: 'Billing City',
        size: 2,
    },
];
const CHILD_COLUMNS = [
    {
        type: 'text',
        fieldName: 'Name',
        label: 'Contact Name',
        initialWidth: 300,
    },
    {
        type: 'phone',
        fieldName: 'Phone',
        label: 'Phone Number',
    },
    {
        type: 'email',
        fieldName: 'Email',
        label: 'Email',
    }
];

export default class AccountGridLwc extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track gridData;
    
    @wire(getAccountsWithContacts)
    wiredAccounts(accounts){
        this._accounts=accounts;
        if(accounts.data){
            this.gridData=accounts.data;
        }
    }

    childRelationshipName='Contacts';
    childObjectApiName='Contact';
    parentColumns= PARENT_COLUMNS;
    childColumns= CHILD_COLUMNS;
    _accounts;
    
    handleDataChange(event){
        //on data change in child component, refresh data & invoke refresh method in customTreeGrid
        refreshApex(this._accounts).then(()=> {
            this.template.querySelector('c-custom-tree-grid').refreshGrid();
        });
    }
}