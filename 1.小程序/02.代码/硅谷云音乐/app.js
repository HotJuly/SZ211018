// app.js
import utilConfig from './utils/config';
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
App({
  onLaunch() {
    const PageFn = Page;

    Page = function(config){

      const onShow = config.onShow;

      config.onShow = function(){

        // if(utilConfig.checkPermission.includes(this.route)){
        if(utilConfig.checkPermission[this.route]){

          if(!hasPermission())return;

        }

        onShow.apply(this);
      }

      config.$myAxios = myAxios;

      // config.$API = API

      return PageFn(config)
    }
  },
  globalData:{
    playState:false,
    audioId:null,
    msg:"我是全局初始化的数据msg"
  }
})
