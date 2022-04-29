import axios from 'axios';
import store from '../store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    let cb;
    config.cancelToken = new CancelToken((callback)=>{
        // 这个cb如果被调用,当前请求就会被取消
        cb = callback;
    })

    // console.log(config)
    store.commit('ADDFNMUTATION',{url:config.url,cb})
    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    store.commit('REMOVEFNMUTATION',response.config.url)
    return response.data;
})

export default request