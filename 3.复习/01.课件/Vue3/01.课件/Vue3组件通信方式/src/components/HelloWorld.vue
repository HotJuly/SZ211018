<template>
  <div class="hello">
    helloWorld
    <br>
    <img :src="result && result.message">
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from "vue"
export default defineComponent({
  name: 'HelloWorld',
  async setup() {
    const rawDate = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
        result :rawDate.data
    }
  }
})
</script>


<style scoped></style>
