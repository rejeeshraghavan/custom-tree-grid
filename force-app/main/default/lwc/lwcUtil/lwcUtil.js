import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showToast = (variant, message, mode='dissmissable')=> (context)=> {
    const event = new ShowToastEvent({
        message,
        variant,
        mode
    });
    context.dispatchEvent(event);
}

const handleError = (error, mode='dissmissable') => (context) => {
    let message = reduceErrors(error);
    showToast('error', message, mode)(context);
}
function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }
    return (
        errors
            // Remove null/undefined items
            .filter((error) => !!error)
            // Extract an error message
            .map((error) => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map((e) => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter((message) => !!message)
    );
}
const get = (object, path, defaultVal) =>{
    //path = Array.isArray(path)? path : path.split('\\.');
    path = Array.isArray(path)? path : path.split('\.');
    if(object === undefined) return defaultVal;
    object = object[path[0]];
    if(object && path.length >1){
        return get(object, path.slice(1));
    }
    return object === undefined? defaultVal: object;
}

const empty = (object) => {
    for(const key in object){
        if(object.hasProperty(key)){
            return false;
        }
    }
    return true;
}

const debounce = (func, wait, immediate) => {
    let timeout;
    return function(){
        const context = this, args = arguments;
        const later = function(){
            timeout=null;
            if(!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    }
}

const find = (collection, predicate) => {
    if(!collection){ return undefined;}

    if(typeof predicate == 'function'){
        return Array.prototype.find.call(collection, predicate);
    }else if(!!predicate && typeof predicate === 'object'){
        return Array.prototype.find.call(collection, item => {
            const predicateKeys = Object.keys(predicate);
            return predicate.length>0 && predicateKeys.reduce((val, key) => val && (item[key] === predicate[key]), true);
        });
    }
    throw new Error('Invalid input to find');
}

const isObject = (obj) => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function');
}

function keySet(collection, iteratee){
    let returnObj = [];
    let keyProducer = null;
    
    if(typeof iteratee === 'function'){
        keyProducer = iteratee;
    }else{
        keyProducer = function(obj){
            return obj[iteratee];
        };
    }

    let length = 2;
    for(let i=0; i<collection.length;i++){
        let value = collection[i];
        let key = keyProducer(value);
        if(returnObj.includes(key)){continue;}
        returnObj.push(key);
    }
    return returnObj;
}

function keyBy(collection, iteratee){
    let returnObj = {};
    let keyProducer = null;

    if(typeof iteratee === 'function'){
        keyProducer = iteratee;
    }else{
        keyProducer = function(obj){
            return obj[iteratee];
        };
    }
    for(let i=0; i< collection.length;i++){
        let value = collection[i];
        let key = keyProducer(value);
        returnObj[key] = collection[i];
    }
    return returnObj;
}
export {showToast, handleError, reduceErrors, get, debounce, find, isObject, keySet, keyBy};