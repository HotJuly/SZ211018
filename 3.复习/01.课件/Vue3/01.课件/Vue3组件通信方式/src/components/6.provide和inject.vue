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
import {inject} from 'vue';
const msg2 = inject(["msg1"])
const msg3 = inject("msg2")
console.log(msg2,msg3)
</script>

<style scoped></style>
