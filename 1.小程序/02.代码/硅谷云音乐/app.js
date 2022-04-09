// app.js
import utilConfig from './utils/config';
import hasPermission from './utils/hasPermission';
App({
  onLaunch() {
    // 当小程序开始加载的时候,就会执行该生命周期
    // 该生命周期相当于是页面的onLoad

    // Page是用于注册生成页面实例对象的函数
    // console.log(Page)

    // 1.将Page变量中的函数地址值保存一份在PageFn中
    const PageFn = Page;

    // 2.将Page变量中的内容替换成一个全新的函数
    // 之后所有页面在创建实例对象的时候,用的都是这个全新的函数
    // 为什么要重写Page?因为原先的Page不满足我的需求,所以我要加工一下

    Page = function(config){

      // 将当前页面的onShow方法取出来保存在onShow变量中
      const onShow = config.onShow;

      // 重写配置对象中的onShow方法,改为新的函数,同时在新函数内部调用旧的onShow方法
      config.onShow = function(){

        // console.log(this)
        // 如果checkPermission数组中有当前页面的地址,就说明当前页面需要做权限检测
        // this.route中存储这当前页面的页面路径
        if(utilConfig.checkPermission.includes(this.route)){

          // 也就是说经过以上代码处理,以后如果有多个页面都需要执行的代码,就可以放在该处执行
          // 在所有页面onShow执行的前一瞬间,执行hasPermission方法检查用户是否已经登录
          if(!hasPermission())return;
        }

        // 如果直接onShow调用,那么this将会变成全局对象,而不是页面实例对象
        // 所以必须使用apply方法改变onShow函数的this,如果不改变,本次this将不会是页面的实例对象

        // 同时将传入给onShow的所有参数都收集到arguments中,并交给旧的onShow方法继续使用
        // onShow.apply(this,arguments);
        onShow.apply(this);
      }

      // 注意:在小程序中,有能力创建页面实例对象的只有原先的Page方法
      // 所以新的Page函数中,必须调用旧的Page,并且返回出去旧的Page的返回结果(页面实例对象)
      return PageFn(config)
    }
  }
})
