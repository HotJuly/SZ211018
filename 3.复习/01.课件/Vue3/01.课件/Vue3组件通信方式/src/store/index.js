import { createStore } from "vuex"

export default createStore({
    state:{
        msg555:"msg666"
    },
    mutations:{
        CHANGEMSG(state,{text}){
            state.msg555 = text;
        }
    }
})