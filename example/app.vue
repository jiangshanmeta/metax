<template>
<section>
    {{kk}}
    <child1></child1>
    <child2></child2>
    <child3></child3>
    <child4></child4>
</section>
</template>

<script>
import child1 from "@/components/child1"
import child2 from "@/components/child2"
import child3 from "@/components/child3"
import child4 from "@/components/child4"
export default{
    data(){
        return {
            kk:"hello world"
        }
    },
    components:{
        child1,
        child2,
        child3,
        child4,
    }
}
</script>