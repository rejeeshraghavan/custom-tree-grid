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

    parentRowTypeMap={};
    showNewRecord;
    connectedCallback(){
        //create a map of data type & field names for the parent row
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
        this.notifyParent(this);
    }
    handleRecordFormCancel(event){
        this.showNewRecord=false;
        this.notifyParent(this);
    }
    handleRecordFormError(event){
        handleError(event.detail)(this);
        console.error('ERROR: '+ JSON.stringify(event.detail));
    }
    handleDataChange(event){
        event.stopPropagation();
        // if(event.detail){
        //     console.log(JSON.stringify(event.detail));
        //     let deletedId = event.detail;
        //     let rowData = [];
        //     rowData = this.gridData.filter(element => (element.Id !== deletedId));
        //     this.gridData= rowData;
        // }
        this.notifyParent(this);
    }
    notifyParent(context){
        context.dispatchEvent(
            new CustomEvent('datachanged')
        );
    }
}