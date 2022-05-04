<template>
  <Suspense>
    <template #default>
      <HelloWorld/>
    </template>
    <template #fallback>
      <h1>loading...</h1>
    </template>
  </Suspense>
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

<style></style>
