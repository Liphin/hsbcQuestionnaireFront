/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallDataSer', function ($rootScope) {

    let overallData = {
        'screen': {'width': '', 'height': ''},
        'loginStatus': false,
        'loadingData': false, //
        'requestDataErrorMsg': '尊敬的客户，服务出错，请稍后重试',
        'fileSuffix': ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'png', 'jpeg', 'jpg', 'gif', 'pfx', 'zip'], //文件后缀辅助数据

        phoneView:{
            showPhoneView: false, //是否展开手机页面
            htmlFrameData:'', //HTML框架页面
        },
    };

    // Url系统各种文件获取的URL设置
    let baseUrlData = {
        frontEndHttp: "http://127.0.0.1:3080/", //前端url
    };

    //http请求的具体路径
    let urlData = {
        frontEndHttp: {
            getPhoneHtmlFrame: baseUrlData.frontEndHttp + "assets/helper/phoneHtmlFrame.html", //手机框架HTML数据
        }
    };

    //用于sql注入filter
    var sqlVerify = [];


    //location.path的重定向
    var redirect = {
        'loginHome': '/login/home',
        'arbiList': '/arbitration/list',
        'arbiListTest': '/arbitration/listTest',
    };


    var zIndexHelper = {
        loading: 5000,
        phoneView: 1000
    };

    //电脑键盘按键操作
    let keyBoard = {
        "ctrl": false,
    };


    return {
        keyBoard: keyBoard,
        urlData: urlData,
        redirect: redirect,
        sqlVerify: sqlVerify,
        overallData: overallData,
        baseUrlData: baseUrlData,
        zIndexHelper: zIndexHelper,
    }
});
