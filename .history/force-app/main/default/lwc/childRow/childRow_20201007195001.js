import { api, LightningElement } from 'lwc';
import{ deleteRecord } from 'lightning/uiRecordApi';
import{get, showToast, handleError} from 'c/lwcUtil';
const CHILD_ACTIONS = [
    { label: 'Edit', name: 'editChild' },
    { label: 'Delete', name: 'deleteChild' }
];
export default class ChildRow extends LightningElement {
    @api childColumns;
    @api childRowData;
    @api editModeEnabled;
    @api childObjectApiName;
    showEditModal;
    formObjectApiName;
    formRecordId;
    formMode='edit';
    formHeader;
    _childActions = { type: 'action', typeAttributes: { rowActions: CHILD_ACTIONS, menuAlignment: 'auto' }};
    _deletedRecordId;
    columns=[];
    connectedCallback(){
        Object.keys(this.childColumns).forEach(key => {
            this.columns.push(this.childColumns[key]);
        });
        if(this.editModeEnabled){
            this.columns.push(this._childActions);
        }
    }
    handleRowAction(event) {
        console.log('ROW');
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {
            case 'editChild':
                this.handleEdit(row.Id)
                break;
            case 'deleteChild':
                this.handleDelete(row.Id);
                break;
        }
    }
    handleEdit(recordId){
        console.log('EDIT:');
        this.showEditModal=true;
        this.formObjectApiName=this.childObjectApiName;
        this.formRecordId=recordId;
        this.formHeader='Edit Record';
    }
    handleDelete(recordId){
        deleteRecord(recordId)
            .then(()=>{
                //dispatch Event & toast
                showToast('success','Record deleted')(this);
                this.notifyDataChange(this, recordId);
            })
            .catch(err =>{
                handleError(err)(this);
                //show Error
            });
    }
    handleFormSuccess(event){
        this.showEditModal=false;
        showToast('success','Record updated')(this);
        this.notifyDataChange(this);
    }
    handleFormCancel(event){
        this.showEditModal=false;
        this.notifyDataChange(this);
    }
    handleFormError(event){
        handleError(event.detail)(this);
        console.log('ERROR: '+ JSON.stringify(event.detail));
    }
    notifyDataChange(context,recordId){
        let eventDetail;
        if(recordId){
            eventDetail = {detail: recordId}
        }
        context.dispatchEvent(
            new CustomEvent('change', eventDetail, { bubbles: true , composed:true})
        );
    }
}