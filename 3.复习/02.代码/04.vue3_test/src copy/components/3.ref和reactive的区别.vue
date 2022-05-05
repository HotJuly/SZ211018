<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>obj:{{ obj.name }}</h2>
    <!-- <h2>obj2:{{ obj2.name }}</h2> -->
    <h2>obj3:{{ obj3.name }}</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import { reactive ,ref} from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<script setup>
/* 
    setup函数或者标签中,无法使用this,只能使用组合API

    ref和reactive的区别
      如果将一个元对象传入ref函数,那么ref函数会将该对象交给reactive函数进行处理,
        得到Proxy对象,最终存放在.value属性中

      ref对象的value值,如果接收到了一个新的对象,那么该对象就会再次交给reactive进行处理,产生全新的代理对象
        ref由于多了一层.value属性,所以可以监视到对象地址值的变化,而reactive不行

      在开发中,
        如果只是想得到一个响应式对象,后续只会修改它内部的属性以及属性值,那么就是用reactive
        如果可能会修改到响应式对象的地址值,那么就是用ref
  */
let obj = {
  name: "小明",
  age: 23,
};

let obj2 = ref(obj);
let obj3 = reactive(obj);

console.log(obj2,obj3);

const clickHandler = () => {
  // obj.name += "1";
  // obj2.value.name += "1";
  // obj3.name += "2"
  // obj2.value={
  //   name:"小王"
  // };

  // 此处不是在修改代理对象的某个属性,而是修改了obj3存储的地址值
  // 也就是说,将原先obj3中存储的代理对象丢弃了,换了一个全新的普通对象放入,所以会失去响应式的特点
  obj3 = {
    name:"小王"
  };
  console.log(obj.name,obj3);
};
</script>

<style scoped></style>
