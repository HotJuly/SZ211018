<template>
  <div class="hello">
    <!-- <h1>{{ a }}</h1> -->
    <h2>{{msg}}</h2>
    <button @click="clickHandler">点击</button>
  </div>
</template>

<script>
import {defineProps,defineEmits} from 'vue'
export default {
  name: "HelloWorld"
};

</script>

<script setup>
const props = defineProps(["msg"]);

const emits = defineEmits(["update:msg"]);
console.log(props.msg)

const clickHandler = ()=>{
  emits("update:msg",'hello App')
}
</script>

<style scoped></style>
