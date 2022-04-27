<template>
  <div class="hello">
    <!-- <h1>{{ value }}</h1> -->
    <!-- <el-button>123</el-button> -->
    <!-- <div v-for="item in arr">{{item}}</div> -->
    <!-- <div v-for="item in arr2">{{item.name}}</div> -->
    <!-- <h2>{{ num | textFilter}}</h2> -->
    <!-- <h2>{{user.name}}</h2> -->

    <!-- <input type="text" v-model="num"> -->
    <!-- <input type="text" :value="num" @input="(event)=>{num=event.target.value}"> -->
    <input type="text" :value="msg" @input="changeValue">
  </div>
</template>

<script>
import Vue from "vue";
import mixins from '../mixins';

export default {
  name: "HelloWorld",
  data() {
    return {
      isShow:true,
      arr:[1,2,3],
      arr2:[{
        name:"xiaoming"
      }],
      num:2
    };
  },
  // mixins:[mixins],
  props: {
    msg: String,
    value:String,
    fn:Function
  },
  // props: ["msg"],
  a: 2,
  methods: {
    changeMsg(){
      // this.isShow = !this.isShow;
      
      // this.$nextTick(()=>{
      //   this.$refs.input888.focus();
      // })
    },
    changeValue(event){
      // console.log('event',event.target.value)
      this.$emit('input666',event.target.value)
    }
  },
  filters:{
    textFilter(val){
      // console.log('textFilter',this.isShow)
      return 'textFilter -- ' + val
    }
  },
  mounted() {
    // this.num=1;
    // console.log('_num',this._num)
    // this.fn(123);
    // Vue.set(this.$data,num,1);

    // 数组的下标没有经过数据劫持
    // this.arr[2] = 6;

    // this.arr.splice(2,1,6);

    // this.arr2[0].name = "xiaowang";

    // delete this.num;
    // console.log(this)

    // console.log(this.$options.name)
    // console.log(this.text)
    // console.log(this.$parent.a)
    // console.log(this.$root.msg)
  },
  // inject:["text","user"],
  model: {
    prop: 'msg',
    event: 'input666'
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
