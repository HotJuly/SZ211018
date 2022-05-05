<template>
  <div class="hello">
    <!-- <h1>{{ a }}</h1> -->
    <button @click="clickHandler">点击</button>
  </div>
</template>

<script>
import {defineEmits} from 'vue'
export default {
  name: "HelloWorld"
};

</script>

<script setup>
// 首先通过defineEmits声明当前组件的自定义事件,在使用返回的emits函数进行触发
// const emits =  defineEmits([]);
const emits =  defineEmits(["hello"]);
// console.log(emits)

const clickHandler = ()=>{
  emits("hello",666)
}
</script>

<style scoped></style>
