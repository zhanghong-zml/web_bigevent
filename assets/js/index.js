$(function () {

    //调用获取用户基本信息的函数
    getUserInfo();

    //点击退出按钮实现退出
    $('#btnLogout').on('click', function () {
        //提示用户是不确认退出
        layer.confirm('是否确认退出！', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');  //清除登录成功时在本地存储的数据
            location.href = './login.html'        //跳转到登录页面
            layer.close(index);          //layer.confirm这个函数自带的
        });
    })

})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers: { Authorization: localStorage.getItem('token') || '' },
        //success成功回调函数
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户数据失败')
            }
            //调用渲染用户头像的函数
            renderAatar(res.data)
        },
        //complete不管成功还是失败都执行的函数
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem('token');  //清除登录成功时在本地存储的数据
                location.href = './login.html'        //跳转到登录页面
            }
        }
    })
}

//渲染用户头像
function renderAatar(user) {
    //1.获取用户名     nickname管理员
    var name = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3.按需渲染图片头像
    if (user.user_pic !== null) {
        //渲染头像
        $('.layui-nav-img').attr('src', user.user_pic).show();   //有头像时显示头像
        $('.text-avatar').hide();                               //隐藏文本头像
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide();     //隐藏头像
        var filst = name[0].toUpperCase();    //获取文本的第一个字符，如果时英文，则转化为大写
        $('.text-avatar').html(filst).show()     //显示文本头像
    }
}

