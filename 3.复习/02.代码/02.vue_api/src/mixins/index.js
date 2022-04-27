export default {
  data(){
    return {
      loading:true
    }
  },
  methods: {
    
  },
  mounted(){
    // console.log('mixins',this.$options.name)
    setTimeout(()=>{
      this.loading=false
    },3000)
  }
}