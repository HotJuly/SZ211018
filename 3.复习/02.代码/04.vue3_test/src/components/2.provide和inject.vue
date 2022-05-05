<template>
  <div class="hello">
    <!-- <h1>{{ a }}</h1> -->
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
  name: "HelloWorld",
  // props: {
  //   msg: String,
  // }
};

</script>

<script setup>
const a1 = inject("a1");
const a2 = inject("a2");
console.log(a1,a2)

// 虽然inject可以接收数组,但是他会对该数组进行toString处理,以下语法无效
// const obj = inject(["a1","a2"]);
// console.log(obj)
</script>

<style scoped></style>
