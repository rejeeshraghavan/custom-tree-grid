import { LightningElement, api, track, wire } from 'lwc';
import getAccountsWithContacts from '@salesforce/apex/AccountGridController.getAccountsWithOpportunities';
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
        label: 'Opportunity Name',
        initialWidth: 300,
    },
    {
        type: 'number',
        fieldName: 'Amount',
        label: 'Amount',
    },
    {
        type: 'date',
        fieldName: 'CloseDate',
        label: 'Close Date',
    },
    {
        type: 'text',
        fieldName: 'StageName',
        label: 'Stage',
    }
];
export default class OpportunityGrid extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track gridData;
    
    @wire(getAccountsWithContacts)
    wiredAccounts(opportunities){
        this._opportunities=opportunities;
        if(opportunities.data){
            this.gridData=opportunities.data;
        }
    }

    childRelationshipName='Opportunities';
    childObjectApiName='Opportunity';
    parentColumns= PARENT_COLUMNS;
    childColumns= CHILD_COLUMNS;
    _opportunities;
    
    handleDataChange(event){
        //on data change in child component, refresh data & invoke refresh method in customTreeGrid
        refreshApex(this._opportunities).then(()=> {
            this.template.querySelector('c-custom-tree-grid').refreshGrid();
        });
    }
}