<template>
  <div class="hello">
    <h1>hello world!!!</h1>
    <slot name="default"></slot>
    <slot name="content"></slot>
    <slot name="footer" :text="text"></slot>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  data(){
    return{
      text:"欢迎光临"
    }
  }
};
</script>

<style scoped></style>
