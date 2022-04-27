<template>
  <div>A</div>
</template>

<script>
export default {
  name:"A",
  mounted(){
    console.log(' A mounted');
  },
  beforeDestroy() {
    console.log(' A beforeDestroy');
  },
  activated(){
    console.log('A activated')
  },
  deactivated(){
    console.log('A deactivated')
  }
};
</script>

<style scoped></style>
