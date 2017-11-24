import Vue from "vue"
import metax from "src/index.js"

Vue.use(metax)

import plugin from "./plugin.js"


export default new metax.Store({
    plugins:[plugin],
})