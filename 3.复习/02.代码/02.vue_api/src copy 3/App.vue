<template>
  <div id="app">
    <h1 v-once>{{ num }}</h1>
    <!-- <HelloWorldVue :num.sync="num"/> -->
    <HelloWorldVue
      :num="num"
      @update:num="
        (data) => {
          num = data;
        }
      "
    />
    <!-- <component :is="showComponent"></component> -->
    <!-- <button @click="changeComponent">切换</button> -->

    <!-- <keep-alive>
      <A v-if="isShow"></A>
      <B v-else></B>
    </keep-alive> -->
  </div>
</template>

<script>
import HelloWorldVue from "./components/HelloWorld.vue";
import A from "./components/A.vue";
import B from "./components/B.vue";
export default {
  name: "App",
  components: {
    HelloWorldVue,
    A,
    B,
  },
  data() {
    return {
      num: 123,
      a: 1,
      b: 2,
      c: 3,
      type: null,
      name1: "n",
      name2: "um",
      showComponent: A,
      isShow: true,
    };
  },
  watch: {
    // num(newValue){
    //   console.log('num',newValue)
    // }
  },
  created() {
    // setTimeout(() => {
    // this.num++;
    // this.type = 'b';
    // this.$watch(this.type,function(newValue){
    //   console.log('type',newValue)
    // })

    // this.$watch(
    //   function () {
    //     console.log(this.name1+this.name2)
    //     return this.name1 + this.name2;
    //   },
    //   function (newValue) {
    //     console.log("num", newValue);
    //   }
    // );
    // }, 1000);

    // setTimeout(() => {
    //   this.num++;
    // }, 2000);
    this.$bus.$on("getData", (data) => {
      console.log("getData", data);
    });
  },
  mounted() {
    this.num++;
    console.log(this.num);
    // this.$destroy();
  },
  methods: {
    changeComponent() {
      // this.showComponent = B
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style></style>
