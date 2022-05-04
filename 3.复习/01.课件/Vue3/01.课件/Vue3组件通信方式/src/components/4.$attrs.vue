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
import {useAttrs,defineProps} from 'vue';
const attrs = useAttrs();
const props = defineProps(["msg"]);
console.log('attrs',attrs,props)
</script>

<style scoped></style>
