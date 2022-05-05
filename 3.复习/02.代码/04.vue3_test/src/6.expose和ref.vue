<template>
  <HelloWorld ref="helloRef" v-model:msg="msg"/>
</template>

<script>
import {ref,onMounted} from 'vue';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
const helloRef = ref(null);

onMounted(()=>{
  console.log('helloRef',helloRef)
  console.log(helloRef.value.a,helloRef.value.clickHandler)
})
</script>

<style>
</style>
