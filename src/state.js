import Vue from "vue"
import {proxy} from "./utility.js"

function state_mixin(Store){
    Object.defineProperty(Store.prototype,'watch',{
        value:function(getter,cb,option){
            return this._vm.$watch(getter,cb,option)
        }
    })
}

function init_state(store){
    store.state = {};
    store.getters = {};
    let vueOption = {};
    let data = store.$options.state;
    if(data){
        vueOption.data = data;
    }
    let getters = store.$options.getters;
    const isModule = store.$isModule;

    const $root = store.$root;
    const rootState = $root.state;
    const rootGetters = $root.getters;

    let computed = {};

    if(getters && typeof getters === 'object'){
        vueOption.computed = computed;
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            let getterFn = getters[key];
            computed[key] = function(){
                let args = [store.state,store.getters];
                if(isModule){
                    args.push(rootState,rootGetters)
                }
                // TODO 实现模块中的rootState和rootGetters
                return getterFn(...args)
            }
        })
    }



    store._vm = new Vue(vueOption)

    const namespaced = store.$options.namespaced;
    // 非根实例才需要代理到根实例
    const needProxyParent = $root !== store;
    let prefix = '';
    if(namespaced){
        const modulePath = store.$options.modulePath;
        if(modulePath.length){
            prefix = modulePath.join("/") + "/";
        }
    }

    // state代理到根实例上在module中做
    if(store._vm.$data){
        let keys = Object.keys(store._vm.$data);
        keys.forEach((key)=>{
            proxy(store.state,key,store._vm)
        })
    }

    if(getters){
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            proxy(store.getters,key,store._vm);
            // 代理到第一个有命名空间的父实例上
            if(needProxyParent){
                proxy($root.getters,prefix+key,store.getters,key)
            }
        })
    }

}

export {
    state_mixin,
    init_state,
}