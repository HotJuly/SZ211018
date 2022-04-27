<template>
  <div id="app">
    {{ num }}
    <!-- <HelloWorldVue :num.sync="num"/> -->
    <HelloWorldVue :num="num" @update:num="(data)=>{num=data}"/>
  </div>
</template>

<script>
import HelloWorldVue from "./components/HelloWorld.vue";
export default {
  name: "App",
  components:{
    HelloWorldVue
  },
  data() {
    return {
      num: 123,
      a: 1,
      b: 2,
      c: 3,
      type: null,
      name1: "n",
      name2: "um",
    };
  },
  watch: {
    // num(newValue){
    //   console.log('num',newValue)
    // }
  },
  created() {
    // setTimeout(() => {
      // this.num++;
      // this.type = 'b';
      // this.$watch(this.type,function(newValue){
      //   console.log('type',newValue)
      // })

      // this.$watch(
      //   function () {
      //     console.log(this.name1+this.name2)
      //     return this.name1 + this.name2;
      //   },
      //   function (newValue) {
      //     console.log("num", newValue);
      //   }
      // );
    // }, 1000);

    // setTimeout(() => {
    //   this.num++;
    // }, 2000);
    this.$bus.$on('getData',(data)=>{
      console.log('getData',data)
    })
  },
  mounted(){
    this.$destroy();
  }
};
</script>

<style></style>
