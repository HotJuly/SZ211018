<template>
  <div id="app">
    <!-- <HelloWorldVue/> -->
    <!-- <HelloWorldVue>
      <template>
        <h1>我是h1标签</h1>
      </template>
      <template #content>
        <h1>我是内容区域</h1>
      </template>
      <template #footer="scope">
        <h1>我是底部区域,{{scope.text}}</h1>
      </template>
    </HelloWorldVue> -->
    <ShowBigImgVue 
      v-bind="$data"
      >
      <!-- <template v-slot:com="scope">
        <h1 v-on="scope.listeners">查看</h1>
      </template> -->
      <template v-slot:com="{listeners}">
        <h1 v-on="listeners">查看</h1>
      </template>
    </ShowBigImgVue>
  </div>
</template>

<script>
import HelloWorldVue from "./components/HelloWorld.vue";
import ShowBigImgVue from "./components/ShowBigImg.vue";
export default {
  name: "App",
  components: {
    HelloWorldVue,
    ShowBigImgVue
  },
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "preview-src-list": [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  }
};
</script>

<style></style>
