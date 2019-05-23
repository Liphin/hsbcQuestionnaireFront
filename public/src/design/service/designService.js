/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function (OverallDataSer, OverallGeneralSer, DesignDataSer, PackSer) {

    /**
     * 预览页面
     * 1、拼装组件并生成HTML数据
     * 2、保存该HTML到后台文件
     * 3、展示前端手机预览页面，iframe的url指向该地址
     * 4、生成携带参数的的小程序二维码
     */
    let viewPage = function () {
        //1、拼装组件并生成HTML数据
        let packWidgetHtmlData = PackSer.packSelectData();
        let fullPhoneHtmlData = OverallDataSer.overallData.phoneView.htmlFrameData.replace(/__CONTENT__/g, packWidgetHtmlData);

        //2、保存该HTML到后台文件
        let jsonData = {
            uniqueId: '5f2f48a0-7d2f-11e9-aac2-51d42dd428f6',
            htmlData: fullPhoneHtmlData,
            dbData: DesignDataSer.sheet,
        };
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.saveSheetData, jsonData, function (result) {
            if (result == 'OK') {
                OverallDataSer.overallData.phoneView.viewSheetUrl = OverallDataSer.urlData.resourceBaseUrl + "html/323232332.html";
                OverallDataSer.overallData.phoneView.showPhoneView = true;
            }
        });
    };

    /**
     * 保存页面信息
     */
    let savePage = function () {

    };


    return {
        viewPage: viewPage,
    }
});