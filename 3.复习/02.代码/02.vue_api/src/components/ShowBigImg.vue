<template>
  <div>
    <!-- <el-image
      v-show="false"
      ref="elImage"
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
    > -->
    <el-image
      v-show="false"
      ref="elImage"
      style="width: 100px; height: 100px"
      v-bind="$attrs"
    >
    </el-image>
    <!-- 在公司开发中,很有可能这次是点击button按钮,下次可能要点击的就是别的内容 -->
    <!-- <el-button @click="clickFn" type="primary">查看</el-button> -->
    <slot name="com" :listeners="{click:clickFn}"></slot>
  </div>
</template>

<script>
export default {
  name: "ShowBigImg",
  data() {
    return {
      // url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      // srcList: [
      //   "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      //   "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      // ],
    };
  },
  methods:{
      clickFn(){
        //   只要能够触发el-image组件里的clickHandler方法就能实现放大镜效果
        this.$refs.elImage.clickHandler();
      }
  }
};
</script>

<style scoped></style>
