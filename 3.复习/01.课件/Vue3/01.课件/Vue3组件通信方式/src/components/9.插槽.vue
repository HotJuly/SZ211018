<template>
  <div class="hello">
    helloWorld
    <br>
    <slot name="default"></slot>
    <slot name="header"></slot>
    <slot name="footer" title="哈哈"></slot>
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
