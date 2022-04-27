<template>
  <div>B</div>
</template>

<script>
export default {
  name:"B",
  mounted(){
    console.log(' B mounted');
  },
  beforeDestroy() {
    console.log(' B beforeDestroy');
  }
};
</script>

<style scoped></style>
