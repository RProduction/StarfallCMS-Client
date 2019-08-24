import {createSelector} from 'reselect';

// storage selectors
const _selectStorage = (state, path) => {
    let storage = state.storage;
    
    const paths = path.split('/');
    paths.forEach((value) => {
        storage = storage[value];
    });

    return storage;
};
export const selectStorage = ()=>{
    return createSelector(
        _selectStorage,
        (storage)=>{
            let res;

            if(storage){
                res = Object.entries(storage).map(([key, value]) => {
                    let res;
                    // if name properties exist then file
                    if(value.name && value.name.constructor === String){
                        res = value;
                    }else{
                        res = {name: key};
                    }
    
                    return res;
                });
            }else{
                res = [];
            }

            return res;
        }
    );
};

// storage path selector
export const selectStoragePath = state => {
    let path = state.storagePath;
    
    let id = '';
    let partialpath = '';
    let currentpath = '';
    
    const paths = path.split('/');
    paths.forEach((value, index) => {
        if(index === 0)
            id = value;
        else if(index === 1)
            partialpath = value;
        else if(index+1 < paths.length){
            partialpath += `/${value}`;        
        }

        currentpath = value;
    });

    return {
        id: id,
        fullpath: path,
        partialpath: partialpath,
        currentpath: currentpath
    };
}