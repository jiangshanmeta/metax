
import {init_lifecycle} from "./lifecycle.js"
import {state_mixin,init_state} from "./state.js"
import {init_mutations,mutation_mixin} from "./mutation.js"
import {init_actions,action_mixin} from "./action.js"
import {init_module,module_mixin} from "./module.js"
import init_plugin from "./plugin.js"
function Store(options){
    if(!new.target){
        console.error("请使用new关键字调用");
        return;
    }
    this.$options = options;
    init_lifecycle(this);
    init_state(this);
    init_mutations(this);
    init_actions(this);
    init_module(this);
    init_plugin(this);

    
}

// 避免constructor属性被修改
Object.defineProperty(Store.prototype,'constructor',{
    value:Store,
});

state_mixin(Store);
mutation_mixin(Store);
action_mixin(Store);
module_mixin(Store);
export default Store