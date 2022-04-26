const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    // 由于此处具有开关设置,所以多个nextTick只会开启一个.then微任务
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    // 由于此处具有开关设置,所以多个nextTick只会执行一次timerFunc
    timerFunc()
  }
}

/*
  nextTick源码重点:
    1.连续调用多个nextTick只会创建一个微任务
    2.nextTick使用callbacks数组收集所有的nextTick的回调函数,实现了一个队列
    3.在微任务执行的时候,会将callbacks数组中所有的回调函数依次遍历执行

  Vue响应式流程:
    1.当开发者修改某个响应式属性的时候,会触发该属性的set方法
    2.在set方法中,会执行dep.notify方法,通知watcher开始进行视图更新
    3.watcher会调用update方法,准备开始更新
    4.update方法会调用queueWatcher方法
    5.queueWatcher方法中会调用nextTick方法,并且将更新视图的函数交给nextTick作为回调函数
    6.最终,当开始清空微任务队列的时候,视图一定会在第一顺列进行更新

*/
