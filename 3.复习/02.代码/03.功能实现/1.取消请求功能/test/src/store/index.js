import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        fns:{

        }
    },
    mutations:{
        ADDFNMUTATION(state,{url,cb}){
            state.fns[url] = cb;
        },
        
        REMOVEFNMUTATION(state,url){
            delete state.fns[url];
        },

        CLEARFNSMUTATION(state){
            Object.values(state.fns).forEach((cb)=>{
                cb();
            })
        }
    }
})