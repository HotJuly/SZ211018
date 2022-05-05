<template>
  <div class="hello">
    <!-- <button @click="clickHandler">点击</button> -->
    <h2>{{a}}</h2>
  </div>
</template>

<script>
import { defineExpose } from 'vue';
export default {
  name: "HelloWorld"
};

</script>

<script setup>

const a = 123;
const clickHandler = ()=>{
  console.log(111)
}
console.log('clickHandler',clickHandler)
defineExpose({
  // a,
  clickHandler
});
</script>

<style scoped></style>
