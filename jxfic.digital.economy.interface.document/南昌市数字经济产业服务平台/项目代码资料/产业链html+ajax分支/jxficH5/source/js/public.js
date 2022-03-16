document.write('<!-----------  公共js和css start----------->');
//获取当前网址，如： http://localhost:8083/yudu.onePhotoCard.h5/view/login.html
var curWwwPath=window.document.location.href;
 //获取主机地址之后的目录，如： yudu.onePhotoCard.h5/view/login.html
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
//项目端口
var ports=window.document.location.port;
//获取ip地址，如： http://localhost:
var localhostip=curWwwPath.substring(0,curWwwPath.indexOf(ports));
//获取主机地址，如： http://localhost:8083
var localhostPaht=curWwwPath.substring(0,pos);
//获取带"/"的项目名，如：/yudu.onePhotoCard.h5
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var curWwwPath=window.document.location.href;
var realPath=localhostPaht+projectName+"/";//获取绝对路径
//获取当前页面路径 例 view/login.html
var htmlName=pathName.substring(pathName.substr(1).indexOf('/')+2)
document.write('' +
    '<link rel="stylesheet" href="'+realPath+'source/js/layui/css/layui.css">\n' +
    '<link rel="stylesheet" href="'+realPath+'source/css/includefile.css" />\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/jquery-1.9.1.min.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/md5.min.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/layer/layer.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/layui/layui.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/layui_exts/excel.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/echarts.js"></script>\n' +
    '<script type="text/javascript" src="'+realPath+'source/js/crypto-js.js"></script>\n' +
    '');