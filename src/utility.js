function proxy(target,key,source,sourceKey=key){
    Object.defineProperty(target,key,{
        get(){
            return source[sourceKey]
        },
        set(newVal){
            return source[sourceKey] = newVal
        },
        enumerable:true
    })
}

export {
    proxy
}