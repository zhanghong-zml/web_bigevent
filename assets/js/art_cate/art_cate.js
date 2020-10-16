
$(function () {

    var layer = layui.layer
    var form = layui.form

    //调用函数 渲染页面
    initArtCateList()

    //获取文章列表  渲染页面
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }

    // ************添加********
    //为添加类别绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            title: '添加类别',
            type: 1,
            area: ['500px', '250px'],
            //content-弹出框显示内容，把定义的表单内容赋值给content
            content: $('#dialog-add').html()
        });
    })


    //监听表单事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList();
                layer.msg('新增分类成功！');
                layer.close(indexAdd);

            }
        })
    })

    // ************修改********

    //为修改类别绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            //content-弹出框显示内容，把定义的表单内容赋值给content
            content: $('#dialog-edit').html()
        })

        //获取数据
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var alias = $(this).attr('data-alias');

        //渲染数据
        form.val('form-edit',
            {
                Id: id,
                name: name,
                alias: alias
            }

        )
    })

    //监听表单事件修改数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改数据失败！')
                }
                initArtCateList()
                layer.msg('修改数据成功！');
                layer.close(indexEdit);
            }
        })
    })


    // ************删除********
    $('tbody').on('click', '.btn-delete', function () {
        //获取id
        var id = $(this).attr('data-id');

        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'get',

                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除数据成功！');
                    layer.close(index);
                    initArtCateList()
                }
            });

        })

    })





})