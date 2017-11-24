export default function install(Vue){
    // 向Vue实例及其子实例注入store
    Vue.mixin({
        beforeCreate(){
            const options = this.$options;
            let store;
            if(options.store){
                store = options.store;
            }else if(options.parent && options.parent.$store){
                store = options.parent.$store;
            }
            if(store){
                this.$store = store;
            }
        }
    })
}