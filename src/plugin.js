export default function init_plugin(store){
    const plugins = store.$options.plugins;
    if(!Array.isArray(plugins)){
        return;
    }
    plugins.forEach((plugin)=>{
        plugin(store);
    });
}