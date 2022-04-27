<template>
  <div id="app">
    <!-- <p ref="p1">{{msg}}</p>
    <HelloWorld ref="hello666" v-model="msg" :fn="changeMsg"/> -->
    <!-- <HelloWorld :value="msg" @input="(data)=>msg=data" :fn="changeMsg"/> -->
    <!-- <button @click="changeMsg">change</button> -->
    <!-- <ShowBigImg/> -->
    <MyButton 
    title="你确定要删除该选项吗?" 
    size="small" 
    type="info" 
    @click="clickHandler"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue'
// import mixins from './mixins';
import ShowBigImg from './components/ShowBigImg.vue'
import MyButton from './components/MyButton.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ShowBigImg,
    MyButton
  },
  data(){
    return{
      msg:"Welcome to Your Vue.js App",
      a:8
    }
  },
  // mixins:[mixins],
  methods:{
    changeMsg(val){
      // console.log(this,val)
      // console.log(this)
      this._provided.user.name = "laowang"
    },
    clickHandler(){
      console.log('clickHandler')
    }
  },
  provide:{
    text:"我是App组件的text",
    user:Vue.observable({
      name:"xiaoming"
    })
  },
  mounted(){
    // console.log(this.$children[0].isShow)
    console.log(this.$refs.hello666)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
