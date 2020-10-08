import { api, LightningElement, track } from 'lwc';
import{ deleteRecord } from 'lightning/uiRecordApi';
import{get, showToast, handleError} from 'c/lwcUtil';
const DEFAULT_SIZE=2,
    DEFAULT_CHILD_RELATIONSHIP_NAME = '_children',
    COLLAPSED_ICON='utility:chevronright',
    EXPANDED_ICON='utility:chevrondown';
export default class ParentRow extends LightningElement {
    @api parentRowData;
    @api parentColumns;
    @api childColumns;
    @api parentRowTypeMap;
    @api childRelationshipName;
    @api editModeEnabled;
    @api parentObjectApiName;
    @api childObjectApiName;

    @track parentRow;
    @track hasChildren;
    @track iconName=COLLAPSED_ICON;
    childRowData;
    showChildTable;
    parentRecordId;
    showEditModal;
    formObjectApiName;
    formRecordId;
    formMode='edit';
    formHeader;
    @api refreshData(){
        console.log('parent refreshData');
        this.handleInit();
    }
    connectedCallback(){
        console.log('parent connectedCallback');
        this.handleInit();
    }
    handleInit(){
        this.parentRow=[]
        this.childRelationshipName=this.childRelationshipName?this.childRelationshipName:DEFAULT_CHILD_RELATIONSHIP_NAME;
        this.hasChildren = Object.keys(this.parentRowData).includes(this.childRelationshipName);
        if(this.hasChildren){
            this.childRowData=this.parentRowData[this.childRelationshipName];
         }
        Object.keys(this.parentRowTypeMap).forEach((key) => {
            if(key && key !== this.childRelationshipName){
                let fieldValue, 
                    typeValue,
                    labelValue;
                fieldValue = this.getEntries(this.parentRowData,key);

                typeValue=this.parentRowTypeMap[key];
                if(typeValue){
                    if(typeValue.label){
                        labelValue = this.getEntries(this.parentRowData,typeValue.label);
                    }
                    let size = typeValue.size?typeValue.size:DEFAULT_SIZE;
                    this.parentRow.push({fieldName: `${key}`, value: fieldValue, size:size, type: typeValue.type, label: labelValue});
                }
            }
        });
        if(this.editModeEnabled && this.parentRowData['Id']){
            this.parentRecordId=this.parentRowData['Id'];
        }
    }
    handleAccordionToggle(){
        this.showChildTable = !this.showChildTable;
        this.iconName=this.iconName===COLLAPSED_ICON?EXPANDED_ICON:COLLAPSED_ICON;
    }
    handleParentMenuClick(event){
        let selectedItemValue = event.detail.value;
        switch (selectedItemValue) {
            case 'editParent':
                this.handleEdit();
                break;
            case 'deleteParent':
                this.handleDelete();
                break;
            case 'addChild':
                this.handleAddChild();
                break;
            default:
                console.error('No method defined');
                break;
        }
    }
    handleEdit(){
        this.showEditModal=true;
        this.formObjectApiName=this.parentObjectApiName;
        this.formRecordId=this.parentRecordId;
        this.formHeader='Edit Record';
    }
    handleDelete(){
        deleteRecord(this.parentRecordId)
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
    handleAddChild(){
        this.showEditModal=true;
        this.formObjectApiName=this.childObjectApiName;
        this.formRecordId=null;
        this.formHeader='Add Child Record';
    }
    handleFormSuccess(event){
        this.showEditModal=false;
        //dispatch parent Event
        if(this.formRecordId){
            showToast('success','Record updated')(this);
        }else{
            showToast('success','Child record created')(this);
        }
        this.notifyDataChange(this);
    }
    handleFormCancel(event){
        this.showEditModal=false;
    }
    handleFormError(event){
        handleError(event.detail)(this);
        console.error('ERROR: '+ JSON.stringify(event.detail));
    }
    getEntries(obj, path){
        if(path.includes('\.')){
            return get(obj, path);
        }else{
            return obj[path];
        }
    }
    notifyDataChange(context){
        console.log('FIRED from ParentRow');
        context.dispatchEvent(
            new CustomEvent('datachange', { bubbles: true , composed:false})
        );
    }
}