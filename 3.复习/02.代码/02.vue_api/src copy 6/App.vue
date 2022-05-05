<template>
  <div id="app"  class="B">
   app
    <router-view></router-view>
    <!-- <router-link tag="li" to="/home">toHome</router-link> -->
    <router-link tag="a" to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      obj:{
        name:"xiaoming"
      }
    };
  },
  methods:{
    toAbout(){
      // this.$router.push('/about')
      this.$router.replace('/about')
    }
  }
};
</script>

<style></style>
