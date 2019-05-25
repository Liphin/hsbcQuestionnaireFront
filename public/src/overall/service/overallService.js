/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallSer', function ($rootScope, OverallDataSer, $location, $http, OverallGeneralSer) {


    /**
     * 全局初始化应用
     */
    let initData = function () {
        //加载手机预览拼装页面数据
        OverallGeneralSer.httpGetFiles(OverallDataSer.urlData.getPhoneHtmlFrameUrl, function (result) {
            OverallDataSer.overallData.phoneView.sheetFrameData = result;
        });
    };


    /**
     * 鼠标事件停止传递
     * @param $event
     */
    var preventEventTransport = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };


    /**
     * modal的黑色遮罩层背景去掉
     */
    var modalBackRemove = function () {
        $(".modal-backdrop").remove();
    };


    /**
     * 获取sql注入的每个key word
     */
    // var getSqlInjectFilterWords = function () {
    //     /*获取所有嫌疑sql注入key word*/
    //     var allSqlKeyWords = OverallDataSer.urlData['frontEndHttp']['getSqlKeyWord'];
    //
    //     //1. 如果尚未获取全部sql key word数据则http请求获取
    //     if (Object.keys(OverallDataSer.sqlVerify.length <= 0)) {
    //         $http({
    //             method: 'GET',
    //             url: allSqlKeyWords
    //         }).then(function successCallback(response) {
    //             if (response['status'] == 200) {
    //                 OverallDataSer.sqlVerify = response['data'].split(",");
    //             }
    //         }, function errorCallback(err) {
    //             OverallSer.alertHttpRequestError("OverallSer.sqlInjectFilter", 500, err);
    //         });
    //     }
    // };


    /**
     * 键盘按下热键时，根据不同热键类型执行相应的操作
     * @param $event
     */
    var keyboardDownOpt = function ($event) {
        var keyObj = $event.key.toLowerCase();
        switch (keyObj) {
            case 'control': {
                //记录按下ctrl操作
                OverallDataSer.keyBoard['ctrl'] = true;
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 键盘按下热键时，根据不同热键类型执行相应的操作
     * @param $event
     */
    var keyboardUpOpt = function ($event) {
        var keyObj = $event.key.toLowerCase();
        switch (keyObj) {
            case 'control': {
                //记录按下ctrl操作
                OverallDataSer.keyBoard['ctrl'] = false;
                break;
            }
            default: {
                break;
            }
        }
    };


    return {
        initData: initData,
        keyboardUpOpt: keyboardUpOpt,
        keyboardDownOpt: keyboardDownOpt,
        modalBackRemove: modalBackRemove,
        preventEventTransport: preventEventTransport,
    }
});
