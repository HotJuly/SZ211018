<template>
  <div id="app">
    <button v-if="isShow" @click="handleClick">添加</button>
    <input ref="input" v-else type="text">
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isShow:true
    }
  },
  methods: {
    handleClick(){
      this.isShow = false;
      // console.log(this.isShow)
      // debugger

      // 当input框显示出来时,自动获取焦点
      // $nextTick可以将一个回调函数放到DOM更新之后在执行
      this.$nextTick(()=>{
        this.$refs.input.focus();
      })
    }
  },
}
</script>

<style>
</style>
