import Vue from "vue"
import {proxy} from "./utility.js"
import {getStoreCommonInfo} from "./lifecycle.js"

function initViewmodel(store){
    store.state = {};
    store.getters = {};
    const storeCommonInfo = getStoreCommonInfo(store);

    let vueOption = {};
    let data = store.$options.state;
    if(data){
        vueOption.data = data;
    }
    let getters = store.$options.getters;

    const $root = store.$root;
    const {state:rootState,getters:rootGetters} = $root;
    // console.log()

    let computed = {};

    if(getters && typeof getters === 'object'){
        vueOption.computed = computed;
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            let getterFn = getters[key];
            computed[key] = function(){
                let args = [store.state,store.getters];
                if(storeCommonInfo.needProxyRoot){
                    args.push(rootState,rootGetters)
                }

                return getterFn(...args)
            }
        })
    }

    store._vm = new Vue(vueOption)

    // store 代理 data
    if(store._vm.$data){
        let keys = Object.keys(store._vm.$data);
        keys.forEach((key)=>{
            proxy(store.state,key,store._vm)
        })
    }

    if(getters){
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            // store 代理 computed
            proxy(store.getters,key,store._vm);
            // computed 代理到根实例上
            if(storeCommonInfo.needProxyRoot){

                proxy($root.getters,storeCommonInfo.prefix+key,store._vm,key)
            }
        })
    }

}

function viewmodelMixin(Store){
    Object.defineProperty(Store.prototype,'watch',{
        value:function(getter,cb,option){
            return this._vm.$watch(getter,cb,option)
        }
    })
}

function unregisterViewmodel(store,preserveState){
    const getters = store.$options.getters;
    if(getters){
        const storeCommonInfo = getStoreCommonInfo(store);
        const prefix = storeCommonInfo.prefix;
        const $root = store.$root;
        const keys = Object.keys(getters);
        keys.forEach((key)=>{
            delete $root.getters[prefix + key];
        })
    }
    if(!preserveState){
        store._vm.$destroy();
    }
    
}

export {
    viewmodelMixin,
    initViewmodel,
    unregisterViewmodel,
}