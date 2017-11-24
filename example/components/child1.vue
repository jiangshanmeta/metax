<template>
<article>
    <h1>child-1</h1>
</article>
</template>

<script>
export default{
    created(){
        console.log(this.$store,'child1');
    }
}
</script>