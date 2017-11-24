<template>
<article>
    <h1>child-1</h1>
    <div>单价 {{$store.state.price}}</div>
    <div>数量 {{$store.state.count}}</div>
    <div>总价 {{$store.getters.totalPrice}}</div>
    <div>邮费 {{$store.getters.postFee}}</div>
    <div>合计 {{$store.getters.finalPrice}}</div>
</article>
</template>

<script>
export default{
    created(){
        console.log(this.$store,'child1');
    }
}
</script>