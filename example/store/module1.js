export default{
    state:{
        firstName:"first-name",
        lastName:"last-name",
        age:16,
    },
    getters:{
        fullName(state){
            return state.firstName + state.lastName;
        },
        desc(state,getters){
            // console.log(arguments,"module1 unnamespaced");
            return `${getters.fullName} is ${state.age} years old`;
        }
    },
    mutations:{
        changeAge(state,payload){
            // console.log(state,payload)
            state.age = payload.newAge;
            // console.log(state.age)
        },
        changeLastName(state,payload){
            state.lastName = payload
        }
    },
    actions:{
        changeUserInfo({commit,state},payload){
            setTimeout(()=>{
                commit('changeAge',{newAge:state.age+2});
                commit('changeLastName',payload.lastName)
            })
        }
    },
}