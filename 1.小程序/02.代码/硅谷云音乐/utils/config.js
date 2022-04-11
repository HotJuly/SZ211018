export default{
    host:"http://localhost:3000",

    // checkPermission中会记录哪些页面需要做权限检测
    // checkPermission:["pages/video/video","pages/index/index"],

    checkPermission:{
        "pages/video/video":true,
        "pages/index/index":false,
        "pages/recommendSong/recommendSong":true
    }
}