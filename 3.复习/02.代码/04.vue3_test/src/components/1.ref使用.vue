<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{value2}}</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    // console.log('------setup-------',this)
    const value = 123;
    return {
      value
    }
  },
  beforeCreate(){
    // console.log('------beforeCreate-------',this)
  },
  // methods:{
  //   clickHandler(){
  //     console.log(1)
  //   }
  // }
}
</script>

<script setup>
  /* 
    setup函数或者标签中,无法使用this,只能使用组合API

    ref是一个函数,可以将一个基础数据类型的数据传入到ref函数中
    ref对象中的value属性会被Vue3进行数据劫持,变成set/get方法
      所以直接修改ref对象的value值就具有响应式的特点

    注意:ref对象在template中使用不需要加上.value,模版会自动读取.value属性进行展示
            但是在写js代码的时候,必须加上.value进行读取或者修改
  */
  let value2 = ref(234);

  const clickHandler = ()=>{
      // console.log(2)
      value2.value+=1;
      console.log(value2.value)
  }
</script>

<style scoped>
</style>
