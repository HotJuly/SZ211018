// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export default new Vuex.Store({
//     state:{},
//     mutations:{},
//     actions:{},
//     getters:{},
//     modules:{}
// })

import {createStore} from 'vuex';


export default createStore({
    state:{
        initData:"我是store的初始数据"
    },
    mutations:{
        CHANGEINITDATA(state,data){
            state.initData = data;
        }
    },
    actions:{},
    getters:{},
    modules:{}
})