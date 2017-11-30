function initPlugins(store){
    const plugins = store.$options.plugins;
    if(!Array.isArray(plugins)){
        return;
    }
    plugins.forEach((plugin)=>{
        plugin(store);
    });
}

export {
    initPlugins
}