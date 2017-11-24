import init_plugin from "./plugin.js"

function Store(options){
    if(!new.target){
        console.error("请使用new关键字调用");
        return;
    }
    this.$options = options;


    init_plugin(this);
    console.log("sss");
}

export default Store