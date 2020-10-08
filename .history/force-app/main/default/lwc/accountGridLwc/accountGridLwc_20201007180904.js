import { LightningElement, api, track, wire } from 'lwc';
import getAccountsWithContacts from '@salesforce/apex/AccountGridController.getAccountsWithContacts';
import {refreshApex} from '@salesforce/apex';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

const PARENT_COLUMNS = [
    {
        type: 'text',
        //fieldName: 'accountName',
        fieldName: 'Name',
        label: 'Account Name',
        initialWidth: 300,
        size: 3,
    },
    {
        type: 'number',
        //fieldName: 'employees',
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
        //fieldName: 'accountOwner',
        fieldName: 'Owner.FullPhotoUrl',
        label: 'Account Owner',
        size: 2,
        typeAttributes: {
            //label: { fieldName: 'accountOwnerName' },
            label: { fieldName: 'Owner.Name' },
        },
    },
    // {
    //     type: 'text',
    //     //fieldName: 'accountOwner',
    //     fieldName: 'OwnerId',
    //     label: 'Account Owner',
    //     size: 3,
    // },
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
        //fieldName: 'contactName',
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
const GRID_DATA = [
    {
        name: '123555',
        accountName: 'Rewis Inc',
        employees: 3100,
        phone: '837-555-0100',
        accountOwner: 'http://salesforce.com/fake/url/jane-doe',
        accountOwnerName: 'Jane Doe',
        billingCity: 'Phoeniz, AZ',
    },

    {
        name: '123556',
        accountName: 'Acme Corporation',
        employees: 10000,
        phone: '837-555-0100',
        accountOwner: 'http://salesforce.com/fake/url/john-doe',
        accountOwnerName: 'John Doe',
        billingCity: 'San Francisco, CA',
        _children: [
            {
                contactName: '123556-A',
                phone: '837-555-0100',
                email: '123556-A@abc.com',
            },
            {
                contactName: '123556-B',
                phone: '837-555-0100',
                email: '123556-B@abc.com',
            },
        ],
    },

    {
        name: '123557',
        accountName: 'Rhode Enterprises',
        employees: 6000,
        phone: '837-555-0100',
        accountOwner: 'http://salesforce.com/fake/url/john-doe',
        accountOwnerName: 'John Doe',
        billingCity: 'New York, NY',
        _children: [
            {
                contactName: '123557-A',
                phone: '837-555-0100',
                email: '123557-A@abc.com',
            },
        ],
    },

    {
        name: '123558',
        accountName: 'Tech Labs',
        employees: 1856,
        phone: '837-555-0100',
        accountOwner: 'http://salesforce.com/fake/url/jane-doe',
        accountOwnerName: 'John Doe',
        billingCity: 'New York, NY',
        _children: [
            {
                contactName: '123558-A',
                phone: '837-555-0100',
                email: '123558-A@abc.com',
            },
        ],
    },
];

export default class AccountGridLwc extends LightningElement {
    @api recordId;
    @api objectApiName;
    childRelationshipName='Contacts';
    childObjectApiName='Contact';
    @track gridData;
    parentColumns= PARENT_COLUMNS;
    childColumns= CHILD_COLUMNS;
    connectedCallback(){
        this.getAccount();
    }
    getAccount(){
        getAccountsWithContacts()
        .then(accounts => {this.gridData=accounts;});
    }
    handleDataChange(event){
        //refreshApex(this.gridData);
        this.handler();
    }
    @wire(getAccountsWithContacts)
    wiredAccounts(data){
        console.log('DATA: ' + JSON.stringify(data));
        //this.gridData=data
    }

    async handler() {
        const notifyChangeIds = this.gridData.map(row => { return { "recordId": row.Id } });
        console.log('notifyChangeIds: '+ JSON.stringify(notifyChangeIds));
        // Update the record via Apex.
        await getAccountsWithContacts();
        // Notify LDS that you've changed the record outside its mechanisms.
        getRecordNotifyChange(notifyChangeIds);
        this.getAccount();
    }
}