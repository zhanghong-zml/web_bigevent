$(function () {

    var form = layui.form
    var layer = layui.layer

    form.verify({
        //用户昵称
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6之间"
            }
        }
    })

    //调用获用户基本信息的函数
    initUserInfo();
    //获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            //headers: { Authorization: localStorage.getItem('token') || '' },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                //调用form.val,获取表单的并渲染数据
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置按钮
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfo();  //调用渲染数据的函数
    })

    //表单监听
    $('.layui-form').on('submit',function(e){
        //阻止表单事件
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            //headers: { Authorization: localStorage.getItem('token') || '' },
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg("更新用户数据失败！");
                }
                layer.msg('更新数据成功！');

                //调用index.js中的渲染数据函数,重新渲染数据
                window.parent.getUserInfo();
            }
        })
    })



})