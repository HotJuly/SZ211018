<template>
  <div class="hello">
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};

</script>

<script setup>
const msg = "hello"
</script>

<style scoped></style>
