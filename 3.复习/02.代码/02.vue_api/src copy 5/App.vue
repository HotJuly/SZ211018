<template>
  <div id="app"  class="B">
    <ul>
      <li v-for="(item,index) in arr" :key="item">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="addNum">添加</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      arr:[1,2,3,4,5,6]
    };
  },
  methods:{
    addNum(){
      this.arr.splice(2,0,7)
    }
  }
};
</script>

<style></style>
