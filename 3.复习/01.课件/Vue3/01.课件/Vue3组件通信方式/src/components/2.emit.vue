<template>
  <div class="hello">
    helloWorld
    <br>
    <button @click="handleClick">触发</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
import {defineEmits} from 'vue';
const emits = defineEmits(["change"]);
const handleClick = ()=>{
  console.log('handleClick')
  emits("change")
}
</script>

<style scoped></style>
