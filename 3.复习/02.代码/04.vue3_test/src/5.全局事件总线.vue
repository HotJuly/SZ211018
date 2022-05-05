<template>
  <HelloWorld v-model:msg="msg"/>
</template>

<script>
import myBus from './myBus';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
myBus.on("output",(data)=>{
  console.log('app',data)
})
</script>

<style>
</style>
