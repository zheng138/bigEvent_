$(function() {
        // 调用getUserInfo获取用户基本信息
        getUserInfo()
    })
    // 获取用户的基本信息
var layer = layui.layer;

function getUserInfo() {
    $.ajax({
        method: "GET",
        // 昨天做登录功能时,如果用户填写的用户名和密码正确---->已经设置了本地存储,登录上去,
        // 今天要做功能---得到用户的信息----请求得到数据的接口,这个接口要求(请求也可以,必须带上token值)
        url: "/my/userinfo",
        // 把这里拿到baseAPI中去了
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },

        // complete: function(res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
        //         // 1强制清空token
        //         localStorage.removeItem('token')
        //             // 2. 重新跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
        // 不论成功还是失败，最终都会调用 complete 回调函数
        complete: function(res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }

    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
        // 2设置欢迎的文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        // 3按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide()
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()

    }
}
// 点击按钮，实现退出功能
$('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index)
    })
})