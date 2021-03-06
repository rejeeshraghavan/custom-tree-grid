import { api, LightningElement } from 'lwc';
import currencyType from './currencyType.html';
import dateTimeType from './dateTimeType.html';
import emailType from './emailType.html';
import numberType from './numberType.html';
import phoneType from './phoneType.html';
import textType from './textType.html';
import urlType from './urlType.html';
export default class ViewField extends LightningElement {
    @api fieldValue;
    @api fieldLabel;
    @api fieldType;
    @api fieldName;

    render(){
        if(this.fieldType){
            switch(this.fieldType){
                case 'currency':
                    return currencyType;
                case 'date':
                    return dateTimeType;
                case 'email':
                    return emailType;
                case 'number':
                    return numberType;
                case 'phone':
                    return phoneType;
                case 'text':
                    return textType;
                case 'url':
                    return urlType;
                default:
                    return textType;
            }
        }
    }
}