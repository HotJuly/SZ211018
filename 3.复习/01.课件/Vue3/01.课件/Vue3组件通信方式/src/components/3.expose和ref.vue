<template>
  <div class="hello">
    helloWorld
    <br>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
import {defineExpose} from 'vue';
const handleClick = ()=>{
  console.log('handleClick')
}
defineExpose({
  handleClick
})
// console.log(handleClick)
</script>

<style scoped></style>
