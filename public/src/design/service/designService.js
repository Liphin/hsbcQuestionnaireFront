/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function (OverallDataSer, OverallGeneralSer, DesignDataSer, PackSer) {


    /**
     * 保存页面信息
     * 1、手机表单HTML的框架页面添加数据
     * 2、保存该HTML到后台文件
     * 4、生成携带参数的的小程序二维码 TODO
     */
    let savePage = function () {
        //1、手机表单HTML的框架页面添加数据
        let fullPhoneHtmlData = OverallDataSer.overallData.phoneView.sheetFrameData.replace(/__SHEET_DATA_/g, JSON.stringify(DesignDataSer.sheet));

        //2、保存该HTML到后台文件
        let jsonData = {
            uniqueId: '5f2f48a0-7d2f-11e9-aac2-51d42dd428f6',
            htmlData: fullPhoneHtmlData,
            dbData: DesignDataSer.sheet,
        };

        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.saveSheetDataUrl, jsonData, function (result) {
            if (result == 'OK') {

            }
        });
    };


    return {
        savePage:savePage,
    }
});