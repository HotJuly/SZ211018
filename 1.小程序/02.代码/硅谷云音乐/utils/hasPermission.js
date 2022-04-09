export default function () {
    const cookie = wx.getStorageSync('cookie');
    if (!cookie) {
        wx.showModal({
            title: "请先登录",
            content: "该功能需要登录才能使用",
            cancelText: "回到首页",
            confirmText: "去登录",
            success: ({
                confirm
            }) => {
                // 无论用户点击确定还是取消按钮,都会触发成功回调函数
                // console.log('success',data)

                if (confirm) {
                    // 能进入这里就说明用户点击了确定按钮
                    wx.navigateTo({
                        url: "/pages/login/login"
                    })
                } else {
                    // 能进入这里就说明用户点击了取消按钮
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
            },
            fail: () => {
                // 只有在模态对话框显示失败的时候才会执行
                console.log('fail')
            }
        });
        return false;
    }
    return true;
}