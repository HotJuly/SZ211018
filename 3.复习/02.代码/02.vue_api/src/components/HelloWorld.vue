<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <el-button>123</el-button> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:2,
  methods:{
    changeMsg(){

    }
  },
  mounted(){
    // console.log(this.$options.a)
    console.log(c)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
