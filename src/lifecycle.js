let uid = 0;
function initLifecycle(store){
    store._uid = uid++;
    const options = store.$options;
    const parent = options.parent;
    store.$parent = parent;
    if(parent){
        store.$root = parent.$root
    }else{
        store.$root = store;
    }
}

const cacheCommonInfo = {};

function getStoreCommonInfo(store){
    const uid = store._uid;
    if(!cacheCommonInfo[uid]){
        const options = store.$options;
        const $root = store.$root;
        const needProxyRoot = $root !== store;
        const namespaced = store.$options.namespaced;
        let prefix = '';
        if(namespaced){
            const modulePath = store.$options.modulePath;
            if(modulePath.length){
                prefix = modulePath.join("/") + "/";
            }
        }
        cacheCommonInfo[uid] = {needProxyRoot,prefix}
    }

    return cacheCommonInfo[uid];
}


export {
    initLifecycle,
    getStoreCommonInfo,
}