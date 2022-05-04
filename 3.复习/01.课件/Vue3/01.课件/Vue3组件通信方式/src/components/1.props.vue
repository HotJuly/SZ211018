<template>
  <div class="hello">
    helloWorld
    <br>
    {{props.msg}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
import {defineProps} from 'vue';
  const props = defineProps(["msg"])
</script>

<style scoped></style>
