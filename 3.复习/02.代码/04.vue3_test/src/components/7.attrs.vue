<template>
  <div class="hello">
    <!-- <button @click="clickHandler">点击</button> -->
    <h2>{{a}}</h2>
  </div>
</template>

<script>
import { defineProps ,useAttrs } from 'vue';
export default {
  name: "HelloWorld"
};

</script>

<script setup>

const props = defineProps(["a"]);
console.log(props.a,props.b)

const attrs = useAttrs();
console.log(attrs.b)
</script>

<style scoped></style>
