import {initLifecycle} from "./lifecycle.js"
import {viewmodelMixin,initViewmodel} from "./viewmodel.js"
import {initMutations,mutationMixin} from "./mutation.js"
import {initActions,actionMixin} from "./action.js"
import {initModules,moduleMixin} from "./module.js"
import {initPlugins} from "./plugin.js"

function Store(options){
    if(!new.target){
        console.error("请使用new关键字调用");
        return;
    }

    this.$options = options;
    initLifecycle(this);
    initViewmodel(this);
    initMutations(this);
    initActions(this);
    initModules(this);
    initPlugins(this);
}

// 避免constructor属性被修改
Object.defineProperty(Store.prototype,'constructor',{
    value:Store,
});

viewmodelMixin(Store);
mutationMixin(Store);
actionMixin(Store);
moduleMixin(Store);
export default Store