<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>obj2:{{obj2.name}}</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  }
};

</script>

<script setup>
/*
  写在setup中的代码,每次组件初始化的时候,都会执行一次,但是写在上面的script标签中的代码,就不一定

*/
const obj = {
  name:"小明"
}

const obj2 = reactive(obj);

const clickHandler = ()=>{
  obj2.name+="1"
}
</script>

<style scoped></style>
