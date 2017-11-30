<template>
    <section>
        <hr>
        <div>
            <button @click="doRegist">注册模块</button>
        </div>
        <div v-if="isRegisted">
            {{$store.state.module2.module3.a}} || {{$store.getters['module2/module3/b']}}
        </div>

        <div>
            <button @click="unRegist">取消注册</button>
        </div>
    </section>
</template>

<script>
export default{
    data(){
        return {
            isRegisted:false
        }
    },
    methods:{
        doRegist(){
            this.$store.registerModule(['module2','module3'],{
                namespaced:true,
                state:{
                    a:"abc"
                },
                getters:{
                    b(state){
                        return state.a + "zzz"
                    }
                },
                mutations:{
                    registerMutation(){

                    }
                },
                actions:{
                    registerAction(){

                    },
                }
            })
            this.isRegisted = true;
            console.log(this.$store);
        },
        unRegist(){
            this.$store.unregisterModule(['module2','module3'],{preserveState:true});
            // this.isRegisted = false;
            console.log(this.$store)
        }
    }
}
</script>