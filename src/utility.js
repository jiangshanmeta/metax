function proxy(target,key,source){
    Object.defineProperty(target,key,{
        get(){
            return source[key]
        },
        enumerable:true
    })
}

export {
    proxy
}