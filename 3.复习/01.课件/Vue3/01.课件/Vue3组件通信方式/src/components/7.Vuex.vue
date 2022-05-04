<template>
  <div class="hello">
    helloWorld
    <br>
    {{msg555}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<script setup>
import {useStore} from 'vuex';
// console.log($store)
const store = useStore();
    console.log(store)
    const {msg555} = store.state
</script>

<style scoped></style>
