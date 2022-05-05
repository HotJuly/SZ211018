<template>
  <div class="hello">
  </div>
</template>

<script>
import {useStore} from 'vuex';
export default {
  name: "HelloWorld"
};

</script>

<script setup>
const store = useStore();
console.log(1,store.state.initData)
store.commit('CHANGEINITDATA',123)
console.log(2,store.state.initData)
</script>

<style scoped></style>
