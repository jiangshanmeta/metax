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
}