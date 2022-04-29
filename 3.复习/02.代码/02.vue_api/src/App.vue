<template>
  <div id="app"  class="B">
   app
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  methods:{
    toAbout(){
      this.$router.push('/about')
    }
  }
};
</script>

<style></style>
