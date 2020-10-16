$.ajaxPrefilter(function(options){
    // console.log(options);
    options.url='http://ajax.frontend.itheima.net'+options.url



    if(options.url.indexOf('/my/') !== -1){
        options.headers={
              Authorization: localStorage.getItem('token') || ''  
        }
    }
})

//加这个js文件,前面的js文件的请求路径都只写相对路径，不写根路径了
