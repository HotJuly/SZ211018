<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <el-button>123</el-button> -->
    <!-- <div v-for="item in arr">{{item}}</div> -->
    <div v-for="item in arr2">{{item.name}}</div>
    <h2>{{ num | textFilter}}</h2>
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
      _num:2
    };
  },
  mixins:[mixins],
  props: {
    msg: String,
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
    this.fn(123);
    // Vue.set(this.$data,num,1);

    // 数组的下标没有经过数据劫持
    // this.arr[2] = 6;

    // this.arr.splice(2,1,6);

    // this.arr2[0].name = "xiaowang";

    // delete this.num;
    // console.log(this)

    console.log(this.$options.name)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
