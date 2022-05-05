<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{value1}}</h2>
    <h2>{{value2}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data(){
    return{
      value1:123
    }
  },
  // watch:{
  //   a(){},
  //   b(){},
  //   c(){},
  //   d(){},
  //   e(){},
  //   f(){},
  //   g(){}
  // },
  // mounted(){

  // }
};
</script>

<script setup>

const value1 = 234;
const value2 = 234;

</script>

<style scoped></style>
