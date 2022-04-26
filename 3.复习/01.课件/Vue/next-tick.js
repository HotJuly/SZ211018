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
    timerFunc()
  }
}

/*
  nextTick源码重点
    连续调用多个nextTick只会开启一个微任务
    nextTick在源码中实现了一个独立的任务队列,首先nextTick会将所有的回调函数都收集在callbacks数组中
    等到微任务执行的时候,会遍历该数组,执行所有收集到的回调函数

    Vue视图更新流程
      1.当开发者修改某一个响应式属性时,会触发数据劫持,从而执行dep.notify方法进行更新通知
      2.dep.notify中会执行watcher的update方法来准备更新视图
      3.update方法中会执行queueWatcher方法
      4.在queueWatcher方法中会执行nextTick方法,并且将更新视图的函数传入nextTick
        总结:最终导致Vue的更新是一个异步的效果
*/