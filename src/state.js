import Vue from "vue"
import {proxy} from "./utility.js"

function state_mixin(Store){
    Object.defineProperty(Store.prototype,'$watch',{
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

    let computed = {};

    if(getters && typeof getters === 'object'){
        vueOption.computed = computed;
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            let getterFn = getters[key];
            computed[key] = function(){
                // TODO 实现模块中的rootState和rootGetters
                return getterFn(store.state,store.getters)
            }
        })
    }



    store._vm = new Vue(vueOption)

    if(store._vm.$data){
        let keys = Object.keys(store._vm.$data);
        keys.forEach((key)=>{
            proxy(store.state,key,store._vm)
        })
    }

    if(getters){
        let keys = Object.keys(getters);
        keys.forEach((key)=>{
            proxy(store.getters,key,store._vm)
        })
    }

}

export {
    state_mixin,
    init_state,
}