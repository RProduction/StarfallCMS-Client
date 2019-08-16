export const fieldTypes = ['integer', 'float', 'string', 'boolean', 'object', 'array'];

//receive type as blueprint and generate default value for it
export const GenerateDefaultFromType = (type, defaultValue)=>{
    Object.entries(type).forEach(([key, value])=>{
        // check type and assign
        if(value === 'integer'){
            defaultValue[key] = 0;
        }
        else if(value === 'float'){
            defaultValue[key] = 0;
        }
        else if(value === 'string'){
            defaultValue[key] = '';
        }
        else if(value === 'boolean'){
            defaultValue[key] = false;
        }
        else if(value.constructor === Object){
            defaultValue[key] = {};

            // traverse object
            GenerateDefaultFromType(type[key], defaultValue[key]);
        }
        else if(value.constructor === Array){    
            defaultValue[key] = [];
        }
    });
};