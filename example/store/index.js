import Vue from "vue"
import metax from "src/index.js"

Vue.use(metax)

import plugin from "./plugin.js"


export default new metax.Store({
    plugins:[plugin],
    state:{
        price:100,
        count:15,
    },
    getters:{
        totalPrice(state,getters){
            return state.price*state.count;
        },
        postFee(state,getters){
            return getters.totalPrice>1000?1:10;
        },
        finalPrice(state,getters){
            return getters.totalPrice - getters.postFee;
        }
    },
})