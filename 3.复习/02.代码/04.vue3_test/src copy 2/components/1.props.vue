<template>
  <div class="hello">
    <h1>{{ props.msg }}</h1>
  </div>
</template>

<script>
import {defineProps} from 'vue';
export default {
  name: "HelloWorld",
  // props: {
  //   msg: String,
  // }
};

</script>

<script setup>
const props = defineProps(["msg"]);
console.log(props)
</script>

<style scoped></style>
