<template>
  <div class="hello">
    <h1>hello world!!!</h1>
    <input type="text" :value="num" @input="changeNum">
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props:["num"],
  methods:{
    changeNum(event){
      // this.num = event.target.value;
      this.$emit('update:num',event.target.value)
    }
  },
  created(){
    // this.$bus.$emit('getData',123)
  },
};
</script>

<style scoped></style>
