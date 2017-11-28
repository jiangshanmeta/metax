export default function(store){
    // console.log(store,"this is plugin test");
    store.subscribe((mutation,state)=>{
        console.log(mutation,state)
    })

    store.subscribeAction((mutation,state)=>{
        console.log(mutation,state,"subscribeAction")
    })
}