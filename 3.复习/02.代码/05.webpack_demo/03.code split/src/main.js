import '@/index';
// document.write('hello webpack')


import jquery from 'jquery';
// import {a1,a2,a3} from './lodash';

console.log('main.js',jquery)

document.querySelector('#app').onclick=function(){
    // {
    //     path:"/about",
    //     component:()=>{
    //         return import('About.vue')
    //     }
    // }

    // console.log(import('./lodash'));
    import(/* webpackChunkName:"lodash" */'./lodash').then(({a1})=>{
        // console.log(data)
        a1(1,2)
    })
}