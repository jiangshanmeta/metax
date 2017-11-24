export default function init_plugin(vm){
    const plugins = vm.$options.plugins;
    if(!Array.isArray(plugins)){
        return;
    }
    plugins.forEach((plugin)=>{
        plugin(vm);
    });
}