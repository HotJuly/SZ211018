<template>
  <div class="hello">
    helloWorld
    <br>
    <button @click="handleClick">修改msg</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
import {defineEmits} from 'vue';
const emits = defineEmits();
const handleClick = ()=>{
  emits("update:msg","aaa")
}
</script>

<style scoped></style>
