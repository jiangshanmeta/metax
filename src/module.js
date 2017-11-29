import {proxy} from "./utility.js"
function init_module(store){
    store._modules = {};
    const options = store.$options;
    if(!options.modulePath){
        options.modulePath = [];
    }
    const modules = options.modules;

    if(modules){
        let keys = Object.keys(modules);
        keys.forEach((key)=>{
            init_module_item(store,key,modules[key])
        })
    }
}

function init_module_item(store,moduleName,moduleOption){
    const options = store.$options;
    const storePath = store.$options.modulePath;
    const modulePath = Array.from(storePath);
    if(moduleOption.namespaced){
        modulePath.push(moduleName)
    }
    moduleOption.parent = store;
    moduleOption.modulePath = modulePath;
    store._modules[moduleName] = new store.constructor(moduleOption);
    Object.defineProperty(store.state,moduleName,{
        get(){
            return store._modules[moduleName].state;
        },
        configurable:true,
    });
}


function module_mixin(Store){
    Object.defineProperty(Store.prototype,'$isModule',{
        get(){
            return this.$root !== this
        }
    });
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
            init_module_item(store,path.shift(),module);
        }
    });
    Object.defineProperty(Store.prototype,'unregisterModule',{
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
            let moduleName = path.shift();
            let needDelStore = store._modules[moduleName];
            let keys = Object.keys(needDelStore._modules);
            // 删除子组件
            keys.forEach((key)=>{
                needDelStore.unregisterModule(key);
            });
            // 删除代理的 state getters mutation action
            const $root = store.$root;
            delete store.state[moduleName];
            let prefix = '';
            if(needDelStore.$options.namespaced){
                if(needDelStore.$options.modulePath.length){
                    prefix = needDelStore.$options.modulePath.join("/") + "/";
                }
            }

            if(needDelStore.$options.getters){
                let keys = Object.keys(needDelStore.$options.getters);
                keys.forEach((key)=>{
                    delete $root.getters[prefix + key];
                })
            }

            if(needDelStore.$options.mutations){
                let keys = Object.keys(needDelStore.$options.mutations);
                keys.forEach((key)=>{
                    let mutationArr = $root._mutations[prefix+key];
                    let index = mutationArr.length;
                    while(index--){
                        let item = mutationArr[index];
                        if(item.store === needDelStore){
                            mutationArr.splice(index,1)
                        }
                    }
                })
            }

            if(needDelStore.$options.actions){
                let keys = Object.keys(needDelStore.$options.actions);
                keys.forEach((key)=>{
                    let actionArr = $root._actions[prefix+key];
                    let index = actionArr.length;
                    while(index--){
                        let item = actionArr[index];
                        if(item.store === needDelStore){
                            actionArr.splice(index,1);
                        }
                    }
                })
            }


            needDelStore._vm.$destroy();
            delete store._modules[moduleName];
        }
    })
}

export {
    init_module,
    module_mixin,
}