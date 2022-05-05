<template>
  <div class="hello">
    <button @click="clickHandler">点击</button>
  </div>
</template>

<script>
import myBus from '../myBus';
export default {
  name: "HelloWorld"
};

</script>

<script setup>
const clickHandler = ()=>{
  myBus.emit('output','hello app')
}
</script>

<style scoped></style>
