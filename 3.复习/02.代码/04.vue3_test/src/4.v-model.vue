<template>
  <h1>{{msg}}</h1>
  <HelloWorld v-model:msg="msg"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>

// const eventHandler = (data)=>{
//   console.log('eventHandler',data)
// }

const msg =ref("hello world");
</script>

<style>
</style>
