import Vue from "vue"

// console.log(Vue);

import app from "./app.vue"
import store from "@/store/index.js"
new Vue({
    el:"#app",
    render(h){
        return h(app);
    },
    components:{
        app
    },
    store,
    created(){
        console.log(this.$store,'root vm')
    }
})