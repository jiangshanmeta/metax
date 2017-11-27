function init_mutations(store){
    store._mutations = {};
    
    const options = store.$options;
    const mutations = options.mutations;
    const $root = store.$root;
    const needProxyRoot = $root !== store;
    const namespaced = store.$options.namespaced;
    
    if(needProxyRoot){
        store._mutation_subscribes = $root._mutation_subscribes;
    }else{
        store._mutation_subscribes = [];
    }

    let prefix = '';
    if(namespaced){
        const modulePath = store.$options.modulePath;
        if(modulePath.length){
            prefix = modulePath.join("/") + "/";
        }
    }

    
    if(mutations){
        let keys = Object.keys(mutations);
        keys.forEach((key)=>{
            let cb = mutations[key];
            _addMutationToStore(store,key,cb,store);
            if(needProxyRoot){
                _addMutationToStore($root,prefix+key,cb,store);
            }

        })
    }

}

function _addMutationToStore(store,key,cb,context){
    if(!store._mutations[key]){
        store._mutations[key] = [];
    }
    store._mutations[key].push({
        name:key,
        store:context,
        cb
    })
}

function commit(store,type,cb,payload){
    const state = store.state;
    cb(state,payload);
    run_subscribe(store,{type,payload},state)
}

function run_subscribe(store,mutation,state){
    store._mutation_subscribes.forEach((cb)=>{
        cb(mutation,state)
    })
}


function mutation_mixin(Store){
    Object.defineProperty(Store.prototype,'commit',{
        value(type,payload){
            if(type && typeof type ==='object'){
                payload = type;
                type = type['type'];
                delete payload['type'];
            }

            const mutation = this._mutations[type];

            if(mutation){
                mutation.forEach((item)=>{
                    commit(item.store,type,item.cb,payload)
                })
            }

        }
    })
    Object.defineProperty(Store.prototype,'subscribe',{
        value(cb){
            this._mutation_subscribes.push(cb)
        }
    })
}


export {
    init_mutations,
    mutation_mixin,
}