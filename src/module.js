import {proxy} from "./utility.js"
import {unregisterViewmodel} from "./viewmodel.js"
import {unregisterMutation} from "./mutation.js"
import {unregisterAction} from "./action.js"

function initModules(store){
    store._modules = {};
    const options = store.$options;
    if(!options.modulePath){
        options.modulePath = [];
    }
    const modules = options.modules;

    if(modules){
        let keys = Object.keys(modules);
        keys.forEach((key)=>{
            initModule(store,key,modules[key])
        })
    }
}

function initModule(store,moduleName,moduleOption){
    const options = store.$options;
    const storePath = store.$options.modulePath;
    const modulePath = Array.from(storePath);
    if(moduleOption.namespaced){
        modulePath.push(moduleName)
    }
    moduleOption.parent = store;
    moduleOption.modulePath = modulePath;
    store._modules[moduleName] = new store.constructor(moduleOption);
    store.state[moduleName] = store._modules[moduleName].state;
}


function moduleMixin(Store){
    Object.defineProperty(Store.prototype,'registerModule',{
        value(path,module){
            if(!Array.isArray(path)){
                path = [path];
            }
            let store = this;
            let length = path.length;
            while(length>1){
                let moduleName = path.shift();
                store = store._modules[moduleName];
                if(!store){
                    console.error("注册路径异常");
                    return;
                }
                length--;
            }
            initModule(store,path.shift(),module);
        }
    });
    Object.defineProperty(Store.prototype,'unregisterModule',{
        value(path,{preserveState}={preserveState:false}){
            if(!Array.isArray(path)){
                path = [path];
            }
            let store = this;
            let length = path.length;
            while(length>1){
                let moduleName = path.shift();
                store = store._modules[moduleName];
                if(!store){
                    console.error("删除module路径异常");
                    return;
                }
                length--;
            }
            let moduleName = path.shift();
            let needDelStore = store._modules[moduleName];
            if(!needDelStore){
                console.error("要删除module不存在");
                return;
            }
            let keys = Object.keys(needDelStore._modules);
            // 删除子组件
            keys.forEach((key)=>{
                needDelStore.unregisterModule(key);
            });
            // 删除代理的 state getters mutation action
            const $root = store.$root;
            if(!preserveState){
                delete store.state[moduleName];
            }
            
            unregisterViewmodel(needDelStore,preserveState);
            unregisterMutation(needDelStore);
            unregisterAction(needDelStore);

            delete store._modules[moduleName];
        }
    })
}

export {
    initModules,
    moduleMixin,
}