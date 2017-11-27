import {proxy} from "./utility.js"
function init_module(store){
    store._modules = {};
    const options = store.$options;
    if(!options.modulePath){
        options.modulePath = [];
    }
    const modules = options.modules;
    const modulePath = options.modulePath;
    if(modules){
        const Store = store.constructor;
        let keys = Object.keys(modules);
        keys.forEach((key)=>{
            const moduleOption = modules[key];
            moduleOption.parent = store;
            let copyPath = Array.from(modulePath);
            if(moduleOption.namespaced){
                copyPath.push(key);
            }
            
            moduleOption.modulePath = copyPath;

            store._modules[key] = new Store(moduleOption);
            // 处理子实例的state代理问题
            // proxy(store.state,key
            Object.defineProperty(store.state,key,{
                get(){
                    return store._modules[key].state;
                }
            });


        })
    }
}


function module_mixin(Store){
    Object.defineProperty(Store.prototype,'$isModule',{
        get(){
            return this.$root !== this
        }
    })
}

export {
    init_module,
    module_mixin,
}