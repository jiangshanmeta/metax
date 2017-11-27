function init_lifecycle(store){
    const options = store.$options;
    const parent = options.parent;
    store.$parent = parent;
    if(parent){
        store.$root = parent.$root
    }else{
        store.$root = store;
    }
}


export {
    init_lifecycle,
}