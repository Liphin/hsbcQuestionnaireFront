/**
 * Created by Administrator on 2018/2/28.
 */

overallModule.factory('OverallDataSer', function ($rootScope) {

    let overallData = {
        'screen': {'width': '', 'height': ''},
        'loginStatus': false,
        'loadingData': false, //
        'requestDataErrorMsg': '尊敬的客户，服务出错，请稍后重试',
        'fileSuffix': ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'png', 'jpeg', 'jpg', 'gif', 'pfx', 'zip'], //文件后缀辅助数据

        //手机预览操作
        phoneView: {
            showPhoneView: false, //是否展开手机页面
            sheetFrameData: '', //预览HTML框架页面
            sheetHtmlData: '', //装载预览时查看的HTML数据
        },
        //小程序预览操作
        miniView: {
            showMiniView: false, //是否展开小程序预览页面
            sheetMiniQrCode: '', //小程序二维码
        },

        //用户信息
        user: {
            _id: '',
            account: 'admin',
        }
    };

    // Url系统各种文件获取的URL设置
    let baseUrlData = {
        frontEndHttp: "http://127.0.0.1:3301/", //前端url
    };

    //http请求的具体路径
    let urlData = {
        getPhoneHtmlFrameUrl: baseUrlData.frontEndHttp + "src/phone/sheet_frame.html", //手机框架HTML数据
        saveSheetDataUrl: baseUrlData.frontEndHttp + "saveSheetData", //保存表单设计数据
        resourceBaseUrl: baseUrlData.frontEndHttp + "resource/", //保存表单设计数据

        loginUrl: baseUrlData.frontEndHttp + "login", //登录操作
        registerUrl: baseUrlData.frontEndHttp + "register", //注册操作
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
