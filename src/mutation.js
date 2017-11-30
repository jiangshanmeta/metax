import {getStoreCommonInfo} from "./lifecycle.js"

function initMutations(store){
    store._mutations = {};
    const storeCommonInfo = getStoreCommonInfo(store);
    const mutations = store.$options.mutations;
    const $root = store.$root;

    if(storeCommonInfo.needProxyRoot){
        store._mutation_subscribes = $root._mutation_subscribes;
    }else{
        store._mutation_subscribes = [];
    }

    if(mutations){
        let keys = Object.keys(mutations);
        keys.forEach((key)=>{
            let cb = mutations[key];
            registerMutation(store,key,cb,store);
            if(storeCommonInfo.needProxyRoot){
                registerMutation($root,storeCommonInfo.prefix+key,cb,store);
            }

        })
    }

}

function registerMutation(store,key,cb,context){
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


function mutationMixin(Store){
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

function unregisterMutation(store){
    const mutations = store.$options.mutations;
    if(mutations){
        const keys = Object.keys(mutations);
        const $root = store.$root;
        const storeCommonInfo = getStoreCommonInfo(store);
        const prefix = storeCommonInfo.prefix;

        keys.forEach((key)=>{
            let mutationArr = $root._mutations[prefix+key];
            let index = mutationArr.length;
            while(index--){
                let item = mutationArr[index];
                if(item.store === store){
                    mutationArr.splice(index,1);
                }
            }
        })
    }
}


export {
    initMutations,
    mutationMixin,
    unregisterMutation,
}