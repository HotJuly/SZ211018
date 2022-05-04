<template>
  <div class="hello">
    helloWorld
    <br>
  </div>
</template>

<script>
import myBus from '../mybus';
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
myBus.emit('change123',123)
</script>

<style scoped></style>
