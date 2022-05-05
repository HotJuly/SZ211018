<template>
  <div id="app"  class="B">
   app
   <h2>name:{{obj.name}}</h2>
   <h2>age:{{obj.age}}</h2>

   <ul>
    <li v-for="item in arr" :key="item">
      {{item}}
    </li>
   </ul>
   <button @click="clickHandler">修改</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      obj:{
        name:"xiaoming"
      },
      arr:[1,2,3,4]
    };
  },
  methods:{
    clickHandler(){
      // this.arr[1] = 5;
      this.arr.splice(1,1,5)
    }
  },
  mounted() {
    /*
      Vue2响应式原理的缺点:
        1.在组件初始化的时候,会对data中现有的所有属性进行数据劫持
          而以下语法,错过了该时间点,导致age不是响应式的
            this.obj.age=23;

        2.数组的下标没有响应式效果
          问题:为什么没有响应式效果?
          答案:其实下标是可以实现响应式效果的,只是在Vue2源码中故意跳过了对于下标的数据劫持
    
        3.删除某个响应式属性,没有响应式的效果,页面不会发生变化
          因为Vue2使用的是Object.defineProperty来重写属性的,他只能监视get/set
    */
    // this.obj.age=23;
    delete this.obj.name
  },
};
</script>

<style></style>
