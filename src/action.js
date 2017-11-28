function init_actions(store){
    store._actions = {};

    const options = store.$options;
    const actions = options.actions;
    const $root = store.$root;
    const needProxyRoot = $root !== store;
    const namespaced = options.namespaced;

    if(needProxyRoot){
        store._actions_subscribers = $root._actions_subscribers;
    }else{
        store._actions_subscribers = [];
    }

    let prefix = '';
    if(namespaced){
        const modulePath = store.$options.modulePath;
        if(modulePath.length){
            prefix = modulePath.join("/") + "/";
        }
    }

    // console.log(prefix,"prefix")

    if(actions){
        let keys = Object.keys(actions);
        keys.forEach((key)=>{
            let action = actions[key];
            _addActionToStore(store,key,action,store);
            if(needProxyRoot){
                _addActionToStore($root,prefix+key,action,store)
            }
        })
    }
}

function _addActionToStore(store,key,cb,context){
    if(!store._actions[key]){
        store._actions[key] = [];
    }

    store._actions[key].push({
        name:key,
        store:context,
        cb,
    })
}

function action_mixin(Store){
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

export {
    init_actions,
    action_mixin,
}