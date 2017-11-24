<template>
<section>
    {{kk}}
    <child1></child1>
</section>
</template>

<script>
import child1 from "@/components/child1"
export default{
    data(){
        return {
            kk:"hello world"
        }
    },
    components:{
        child1
    }
}
</script>