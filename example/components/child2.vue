<template>
<section>
    <h2>module test 1</h2>
    <div>测试非namespaced 模块state代理 {{$store.state.module1.firstName}}</div>
    <div>测试非namespace模块 getters代理 {{$store.getters.desc}}</div>

    <div>测试namespaced模块 state代理 {{$store.state.module2.bookName}} </div>
    <div>测试namespaced模块 getters代理 {{$store.getters['module2/desc']}}</div>
</section>
</template>

<script>
export default{

}
</script>