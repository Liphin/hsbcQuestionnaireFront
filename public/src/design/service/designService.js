/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function (OverallDataSer, OverallGeneralSer, DesignDataSer, PackSer) {

    /**
     * 点击预览，快速预览或小程序预览
     * @param viewType
     */
    let viewPage = function (viewType) {
        //如果新的viewType不为空则重新赋值
        if (OverallGeneralSer.checkDataNotEmpty(viewType)) {
            DesignDataSer.overallData.viewType = viewType
        }
        //手机页面预览
        if(DesignDataSer.overallData.viewType=='phoneView'){
            OverallDataSer.overallData.phoneView.showPhoneView=true;
        }
        //小程序页面预览
        else if (DesignDataSer.overallData.viewType=='miniView'){


            OverallDataSer.overallData.miniView.showMiniView=true;
        }
    };


    /**
     * 保存页面信息
     * 1、手机表单HTML的框架页面添加数据
     * 2、保存该HTML到后台文件
     * 4、生成携带参数的的小程序二维码 TODO
     */
    let savePage = function () {
        //1、手机表单HTML的框架页面添加数据
        let fullPhoneHtmlData = OverallDataSer.overallData.phoneView.sheetFrameData
            .replace(/__SHEET_DATA__/g, JSON.stringify(DesignDataSer.sheet))
            .replace(/__SHEET_CONFIG__/g, JSON.stringify(DesignDataSer.overallData.sheetConfig));

        //2、保存该HTML到后台文件
        let jsonData = {
            uniqueId: DesignDataSer.overallData.sheetConfig.uniqueid,
            htmlData: fullPhoneHtmlData, //用于保存HTML数据到后台形成文件
            sheetData: DesignDataSer.sheet, //用于保存表单数据到数据库
        };

        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.saveSheetDataUrl, jsonData, function (result) {
            if (result == 'OK') {

            }
        });
    };


    return {
        viewPage: viewPage,
        savePage: savePage,
    }
});