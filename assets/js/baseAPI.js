$.ajaxPrefilter(function(options){
    console.log(options);
    options.url='http://ajax.frontend.itheima.net'+options.url
})

//加这个js文件,前面的js文件的请求路径都只写相对路径，不写根路径了