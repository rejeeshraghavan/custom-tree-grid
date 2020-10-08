import { LightningElement, api } from 'lwc';
import{showToast, handleError} from 'c/lwcUtil';
export default class CustomTreeGrid extends LightningElement {
    @api parentColumns;
    @api childColumns;
    @api gridData;
    @api childRelationshipName;
    @api parentKeyField;
    @api childKeyField;
    @api editModeEnabled;
    @api parentObjectApiName;
    @api childObjectApiName;

    parentRowTypeMap;
    showNewRecord;
    @api refreshGrid(){
        this.template.querySelectorAll('c-parent-row').forEach( element => element.refreshData());
    }
    connectedCallback(){
        //create a map of data type & field names for the parent rows
        this.parentRowTypeMap={};
        this.parentColumns.forEach(element => {
            let label;
            if(element.typeAttributes && element.typeAttributes.label){
                label = element.typeAttributes.label.fieldName;
            }
            this.parentRowTypeMap[element.fieldName]= {type: element.type,label:label, size:element.size};
        });
    }
    handleNewParent(){
        this.showNewRecord=true;
    }
    handleRecordFormSuccess(event){
        showToast('success','Record created')(this);
        this.showNewRecord=false;
        this.notifyDataChange(this);
    }
    handleRecordFormCancel(event){
        this.showNewRecord=false;
    }
    handleRecordFormError(event){
        handleError(event.detail)(this);
        console.error('ERROR: '+ JSON.stringify(event.detail));
    }
    handleDataChange(event){
        event.stopPropagation();
        this.notifyDataChange(this);
    }
    notifyDataChange(context){
        context.dispatchEvent(
            new CustomEvent('datachange')
        );
    }
}