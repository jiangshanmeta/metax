export default{
    namespaced:true,
    state:{
        bookName:"book-name",
        floatNumber:1
    },
    getters:{
        bookPrice(state,getters,rootState,rootGetters){
            return rootState.price + state.floatNumber;
        },
        desc(state,getters,rootState,rootGetters){
            return `${state.bookName} is ${getters.bookPrice} and finalPrice is ${rootGetters.finalPrice} `
        }
    },
    mutations:{
        changeFloat(state,newFloat){
            state.floatNumber = newFloat;
        }
    },
    actions:{
        changeBookInfo({dispatch}){
            console.log("===")
            dispatch("module2/changeNumber",null,{root:true});
        },
        changeNumber({commit,state}){
            commit('changeFloat',state.floatNumber+1);
        }
    },
}