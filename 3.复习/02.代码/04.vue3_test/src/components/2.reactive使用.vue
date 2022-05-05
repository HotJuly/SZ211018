<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ obj.name }}</h2>
    <h2>{{ obj2.name }}</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<script setup>
/* 
    setup函数或者标签中,无法使用this,只能使用组合API

    reactive是一个函数,该函数接收对象数据类型的数据
      reactive会返回一个代理对象
        注意:此时具有两个对象,一个元对象,一个代理对象
          元对象没有响应式的效果,修改他的数据,不会对页面产生影响
          代理对象具有响应式的效果,修改他的数据,会重新渲染页面,同时会自动修改元对象的数据
  */
let obj = {
  name: "小明",
  age: 23,
};

let obj2 = reactive(obj);

console.log(obj,obj2);

const clickHandler = () => {
  // obj.name += "1";
  obj2.name += "1";
  console.log(obj.name);
};
</script>

<style scoped></style>
