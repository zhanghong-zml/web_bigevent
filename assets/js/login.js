$(function () {

    //********登录注册互切换*********
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //********密码验证*******
    //从layui获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify函数，自定义验证规则
    form.verify({

        //密码校验规则
        pwd: [
            /^[\S]{6,12}$/       //\S 非空字符
            , '密码必须6到12位，且不能出现空格'
        ],

        //确认密码框校验规则
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        }
    })

    //*****监听form表单提交事件注册****
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                //去登录按钮调用点击事件
                $('#link_login').click();
            })
    })

    //*****监听form表单提交事件登录****
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),   //获取表单数据 this表示表单
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                //将登陆成功的token字符串，保存到localStorage
                localStorage.setItem('token',res.token);
                //跳转到后台主页     **location.href**网页地址
                location.href='/index.html'
            }
        })
    })



})