<template>
  <Teleport to="body">
    <HelloWorld>
      <template #default>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是具名插槽</h1>
      </template>
      <template #footer="{title}">
        <h1>我是作用域插槽,{{title}}</h1>
      </template>
    </HelloWorld>
  </Teleport>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import myBus from './mybus';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
<script setup>
myBus.on("change123",(data)=>{
  console.log('app change123',data)
})
</script>

<style></style>
