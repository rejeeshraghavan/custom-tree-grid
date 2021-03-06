import { api, LightningElement } from 'lwc';
import{ deleteRecord } from 'lightning/uiRecordApi';
import{showToast, handleError} from 'c/lwcUtil';
const CHILD_ACTIONS = [
    { label: 'Edit', name: 'editChild' },
    { label: 'Delete', name: 'deleteChild' }
];
const DEFAULT_CHILD_RELATIONSHIP_NAME = '_children';
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
    childTableColumns=[];
    
    connectedCallback(){
        Object.keys(this.childColumns).forEach(key => {
            this.childTableColumns.push(this.childColumns[key]);
        });
        if(this.editModeEnabled){
            this.childTableColumns.push(this._childActions);
        }
    }
    handleRowAction(event) {
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
                this.notifyDataChange(this);
            })
            .catch(err =>{
                handleError(err)(this);
                //show Error
            });
    }
    handleFormSuccess(event){
        this.showEditModal=false;
        showToast('success','Record updated')(this);
        if(event.detail && event.detail.id){
            this.notifyDataChange(this);
        }
    }
    handleFormCancel(event){
        this.showEditModal=false;
    }
    handleFormError(event){
        handleError(event.detail)(this);
        console.log('ERROR: '+ JSON.stringify(event.detail));
    }
    notifyDataChange(context){
        context.dispatchEvent(
            new CustomEvent('datachange',{ bubbles: true , composed:true})
        );
    }
}