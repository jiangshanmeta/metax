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

function get_first_unnamespaced_parent(store){
    let parent = store.$parent;
    while(parent){
        if(parent.$options.namespaced){
            return parent;
        }
        parent = parent.$parent
    }
    return store.$root;
}

export {
    init_lifecycle,
    get_first_unnamespaced_parent,
}