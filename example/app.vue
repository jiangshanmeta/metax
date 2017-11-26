<template>
<section>
    {{kk}}
    <child1></child1>
    <child2></child2>
</section>
</template>

<script>
import child1 from "@/components/child1"
import child2 from "@/components/child2"
export default{
    data(){
        return {
            kk:"hello world"
        }
    },
    components:{
        child1,
        child2,
    }
}
</script>