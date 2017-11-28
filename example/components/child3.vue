<template>
    <section>
        <h1>测试action</h1>
        <div>
            <button @click="changeUserInfo">
                测试局部dispatch
            </button>
            {{$store.state.module1.age}} || {{$store.state.module1.lastName}}
        </div>

        <div>
            <button  @click="changeBookInfo">
                测试root参数
            </button>
            {{$store.state.module2.floatNumber}}
        </div>
    </section>
</template>

<script>
export default{
    methods:{
        changeUserInfo(){
            this.$store.dispatch('changeUserInfo',{newAge:25,lastName:"new last name"})
        },
        changeBookInfo(){
            console.log(this.$store)
            this.$store.dispatch('module2/changeBookInfo')
        }
    }
}
</script>