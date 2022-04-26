<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <el-button>123</el-button> -->
    <!-- <h2>{{ num }}</h2> -->
    <button @click="changeMsg" v-if="isShow">添加</button>
    <input ref="input888" v-else type="text">
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      num: 1,
      isShow:true
    };
  },
  props: {
    msg: String,
  },
  a: 2,
  methods: {
    changeMsg(){
      this.isShow = !this.isShow;
      
      this.$nextTick(()=>{
        this.$refs.input888.focus();
      })
    }
  },
  mounted() {
    // console.log(this.$options.a)
    // console.log(c)
    /*
      问题:Vue更新状态数据是同步更新还是异步更新?
      答案:同步更新

      问题二:Vue更新视图是同步更新还是异步更新?
      答案:异步更新

      问题三:如何等视图更新成功之后,再执行某段代码?
      答案:使用nextTick,将一个回调函数作为实参传入nextTick,那么该回调函数就会在DOM更新之后才执行

      研究问题:nextTick是如何做到将一个函数延迟执行的?
      答案:根据案例分析,nextTick应该是开启了一个微任务
    */
    // this.num = 2;
    // debugger;
    // this.$nextTick(() => {
    //   console.log(this.num);
      // debugger;
    // });


    // this.isShow = false;
    

    // Promise.resolve().then(()=>{
    //   console.log('1');
    // })

    // this.$nextTick(() => {
    //   console.log('2');
    // });

    // Promise.resolve().then(()=>{
    //   console.log('3');
    // })

    // this.$nextTick(() => {
    //   console.log('4');
    // });


    // setTimeout(()=>{
    //   console.log('setTimeout')
    // },0)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
