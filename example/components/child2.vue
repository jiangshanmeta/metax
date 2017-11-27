<template>
<section>
    <h2>module test 1</h2>
    <div>测试非namespaced 模块state代理 {{$store.state.module1.firstName}}</div>
    <div>测试非namespace模块 getters代理 {{$store.getters.desc}}</div>

    <div>测试namespaced模块 state代理 {{$store.state.module2.bookName}} </div>
    <div>测试namespaced模块 getters代理 {{$store.getters['module2/desc']}}</div>

    <div> <button @click="changeAge">测试非namespaced模块 mutation</button>  {{$store.state.module1.age}}</div>

    <div>
        <button @click="changeFloat">测试namespaced模块 mutation</button>
        {{$store.state.module2.floatNumber}}
    </div>
</section>
</template>

<script>
export default{
    methods:{
        changeAge(){
            this.$store.commit({
                type:'changeAge',
                newAge:233,
            });

        },
        changeFloat(){
            this.$store.commit('module2/changeFloat',-1);
        },
    }
}
</script>