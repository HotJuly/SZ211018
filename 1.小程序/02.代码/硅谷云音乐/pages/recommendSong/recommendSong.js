// pages/recommendSong/recommendSong.js
// import PubSub from 'pubsub-js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储当前的日期和月份
        day:"--",
        month:"--",

        // 用于存储当前的每日推荐列表数据
        recommendList:[],

        // 用于存储用户当前查看的歌曲下标
        currentIndex:null
    },

    toSong(event){
        // console.log('toSong');
        const {song,index} = event.currentTarget.dataset;

        // 准备工作2
        this.setData({
            currentIndex:index
        })

        wx.navigateTo({
          url: `/pages/song/song?songId=${song.id}`,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 准备工作1
        this.token = this.$PubSub.subscribe('switchType',(msg,type)=>{
            // PubSub订阅函数第一个实参是消息名称,第二个实参才是真正传递过来的数据
            // console.log('switchType',msg,type)

            //流程2:根据song页面发过来的标识,找到对应的歌曲id
            let {recommendList , currentIndex}= this.data;
            if(type==="pre"){
                // 能进入这里就说明用户点击了上一首
                if(currentIndex===0){
                    currentIndex = recommendList.length-1;
                }else{
                    currentIndex--;
                }
            }else{
                // 能进入这里就说明用户点击了下一首
                if(currentIndex===recommendList.length-1){
                    currentIndex = 0;
                }else{
                    currentIndex++;
                }
            }

            const id = recommendList[currentIndex].id;
            // console.log(id)

            this.setData({
                currentIndex
            })

            // 流程3:将找到的id,发送给song页面
            this.$PubSub.publish('sendId',id);
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow:async function () {
        // 由于日期和每日推荐列表数据,都是一天变化一次,所以如果已经具有该数据,就不再请求和更新
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;

        if(day !== this.data.day && month !== this.data.month){

            this.setData({
                day,
                month
            })
    
            const {recommend} = await this.$myAxios('/recommend/songs');
    
            this.setData({
                recommendList:recommend
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.$PubSub.unsubscribe(this.token);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})