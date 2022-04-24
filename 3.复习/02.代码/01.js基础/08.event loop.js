const fs = require('fs');
/*
    定时器的延迟时间的取值范围是1到无限大
        也就是说,即便开发者写0,也代表是1(默认为1)

    node在遍历一个宏任务队列的时候,会将满足条件的宏任务都执行,没有满足继续保留,不会阻塞代码执行

*/

// fs.readFile("./01.原型-扩展1.html",()=>{
//     console.log('2')

//     setTimeout(()=>{
//         console.log('1')
//     },0)

//     setImmediate(()=>{
//         console.log('3')
//     })
// })

// for (let index = 0; index < 100000; index++) {
    
// }

// setTimeout(()=>{
//     console.log('3')
// },0)


/*
    .then可以开启微任务,相当于是异步任务中的VIP
    而nextTick也可以开启微任务,相当于是异步任务中的SVIP

    node中具有两个微任务队列,.then一个,nextTick一个
    node中如果正处于一个微任务队列中,必须先清空改微任务队列,才能进行队列跳转,执行下一个微任务队列
*/
// Promise.resolve().then(()=>{
//     console.log('1')

//     Promise.resolve().then(()=>{
//         console.log('2')
//     })
    
//     process.nextTick(()=>{
//         console.log('3')
//     })

//     Promise.resolve().then(()=>{
//         console.log('4')
//     })
// })


    
process.nextTick(()=>{
    console.log('1')
    
    Promise.resolve().then(()=>{
        console.log('2')
    })
    
    process.nextTick(()=>{
        console.log('3')
    })

    Promise.resolve().then(()=>{
        console.log('4')
    })
})