<template>
  <div id="app" v-loading="loading">
    <p>{{msg}}</p>
    <HelloWorld v-model="msg" :fn="changeMsg"/>
    <!-- <HelloWorld :value="msg" @input="(data)=>msg=data" :fn="changeMsg"/> -->
    <button @click="changeMsg">change</button>
  </div>
</template>

<script>
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import mixins from './mixins';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"Welcome to Your Vue.js App"
    }
  },
  mixins:[mixins],
  a:9,
  methods:{
    changeMsg(val){
      // console.log(this,val)
      // console.log(this)
      this._provided.user.name = "laowang"
    }
  },
  provide:{
    text:"我是App组件的text",
    user:Vue.observable({
      name:"xiaoming"
    })
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
