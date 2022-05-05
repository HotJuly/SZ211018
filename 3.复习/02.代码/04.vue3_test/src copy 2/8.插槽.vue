<template>
  <HelloWorld>
    <template v-slot:default>
      <h3>我是h3标签</h3>
    </template>
    <template v-slot:header>
      <h3>我是header</h3>
    </template>
    <template #footer="scope">
      <h3>{{scope.msg}},我是footer</h3>
    </template>
  </HelloWorld>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
</script>

<style>
</style>
