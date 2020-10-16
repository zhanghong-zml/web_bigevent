$(function () {
  var layer = layui.layer

  //1.获取裁剪区域的dom元素
  var $image = $('#image')
  //配置选项
  const options = {
    //设置裁剪区的比例
    aspectRatio: 1,
    //指定预览区域
    preview: '.img-preview'
  }

  //创建裁剪区域
  $image.cropper(options)


  //为上传绑定点击事件
  $('#btnChooseImage').on('click', function () {
    $('#file').click();
  })

  //文件框绑定chenge事件
  $('#file').on('change', function (e) {
    console.log(e);

    //获取用户选择的文件
    var filelist = e.target.files
    if (filelist.length == 0) {
      return layer.msg('请选择照片！')
    }
    // layer.msg('选择图片成功！')
    //如果文件不为空
    var file = e.target.files[0];
    //将文件转化为路径
    var imgURL = URL.createObjectURL(file)
    //重新初始化裁剪区域
    $image
      .cropper('destroy')    //销毁旧的裁剪区域
      .attr('src', imgURL)     //重新设置图片路径
      .cropper(options)       //重新初始化裁剪区域

  })


  //为确定按钮绑定点击事件
  $('#btnUpload').on('click', function () {

    //1.拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    //2.调用接口，把头像传到服务器
    $.ajax({
      url: '/my/update/avatar',
      type: 'post',
      data: {avatar:dataURL},
      //headers: { Authorization: localStorage.getItem('token') || '' },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新头像失败！')
        }
        layer.msg('更新头像成功！')
        //调用渲染头像函数
        window.parent.getUserInfo();
      }

    })
  })





})