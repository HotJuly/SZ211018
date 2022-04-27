<template>
  <div>
    <el-popconfirm :title="title">
      <el-button 
      slot="reference" 
      v-on="$listeners" 
      v-bind="$attrs">删除</el-button>
      <!-- <el-button slot="reference" :size="size" :type="type">删除</el-button> -->
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  props:["title"],
  data() {
    return {};
  },
  mounted(){
      console.log(this.$listeners)
  }
};
</script>

<style scoped></style>
