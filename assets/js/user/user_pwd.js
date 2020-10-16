$(function () {
    var form = layui.form

    form.verify({

        //密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //原密码和新密码不一样
        samePwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return "两次密码不能相同！"
            }
        },
        //确认密码框校验规则
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码不一致！"
            }
        }
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            //headers: { Authorization: localStorage.getItem('token') || '' },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return "更新密码失败！"
                }
                layui.layer.msg('更新密码成功！');
                $('.layui-form')[0].reset();    //reset重置表单
            }
        })
    })




})