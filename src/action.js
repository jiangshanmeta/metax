import {getStoreCommonInfo} from "./lifecycle.js"

function initActions(store){
    store._actions = {};
    const storeCommonInfo = getStoreCommonInfo(store);
    const actions = store.$options.actions;
    const $root = store.$root;

    if(storeCommonInfo.needProxyRoot){
        store._actions_subscribers = $root._actions_subscribers;
    }else{
        store._actions_subscribers = [];
    }

    if(actions){
        let keys = Object.keys(actions);
        keys.forEach((key)=>{
            let action = actions[key];
            registerAction(store,key,action,store);
            if(storeCommonInfo.needProxyRoot){
                registerAction($root,storeCommonInfo.prefix+key,action,store)
            }
        })
    }
}

function registerAction(store,key,cb,context){
    if(!store._actions[key]){
        store._actions[key] = [];
    }

    store._actions[key].push({
        name:key,
        store:context,
        cb,
    })
}

function actionMixin(Store){
    Object.defineProperty(Store.prototype,'dispatch',{
        value(type,payload){
            if(type && typeof type === 'object'){
                payload = type;
                type = type['type'];
                delete payload['type']
            }

            const actions = this._actions[type];
            if(actions){
                actions.forEach((action)=>{
                    dispatch(action.store,type,action.cb,payload)
                })
            }
        }
    })

    Object.defineProperty(Store.prototype,'subscribeAction',{
        value(cb){
            this._actions_subscribers.push(cb);
        },
    })
}


function run_action_subscribes(store,action,state){
    store._actions_subscribers.forEach((cb)=>{
        cb(action,state)
    })
}


function dispatch(store,type,cb,payload){
    let $root = store.$root;
    let context = {};
    context.state = store.state;
    context.getters = store.getters;
    context.rootState = $root.rootState;
    context.rootGetters = $root.getters;
    context.commit = function(type,commitPayload,option={root:false}){
        let callContext;
        if(option.root){
            callContext = $root;
        }else{
            callContext = store;
        }
        callContext.commit(type,commitPayload);
    }
    context.dispatch = function(type,dispatchPayload,option={root:false}){
        let callContext;
        if(option.root){
            callContext = $root;
        }else{
            callContext = store;
        }
        callContext.dispatch(type,dispatchPayload);
    }
    cb(context,payload);
    run_action_subscribes(store,{type,payload:payload},store.state)
}

function unregisterAction(store){
    const actions = store.$options.actions;
    if(actions){
        const keys = Object.keys(actions);
        const $root = store.$root;
        const storeCommonInfo = getStoreCommonInfo(store);
        const prefix = storeCommonInfo.prefix;

        keys.forEach((key)=>{
            let actionArr = $root._actions[prefix+key];
            let index = actionArr.length;
            while(index--){
                let item = actionArr[index];
                if(item.store === store){
                    actionArr.splice(index,1);
                }
            }
        });

    }
}

export {
    initActions,
    actionMixin,
    unregisterAction,
}