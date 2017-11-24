

import {state_mixin,init_state} from "./state.js"
import init_plugin from "./plugin.js"

function Store(options){
    if(!new.target){
        console.error("请使用new关键字调用");
        return;
    }
    this.$options = options;

    init_state(this);
    init_plugin(this);
    console.log("sss");
}

state_mixin(Store);

export default Store