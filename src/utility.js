function proxy(target,key,source,sourceKey=key){
    Object.defineProperty(target,key,{
        get(){
            return source[sourceKey]
        },
        enumerable:true
    })
}

export {
    proxy
}