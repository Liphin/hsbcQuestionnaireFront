/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function (OverallDataSer, OverallGeneralSer, DesignDataSer, $routeParams) {

    /**
     * 初始化渲染数据集
     */
    let init = function () {
        //1、http请求获取对应的表单数据
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getTargetSheetUrl, {_id: $routeParams._id}, result => {
            if (result.status == 200) {
                //赋值表单页面编辑数据
                DesignDataSer.sheet = result.data.sheet;
                //赋值表单全局设置数据
                DesignDataSer.overallData.sheetConfig = {
                    _id: result.data._id,//唯一的id号，
                    userid: result.data.userid,//创建者id号
                    title: result.data.title,//标题
                    open: result.data.open, //是否对外开放查询结果
                    type: result.data.type//表单类型：问卷、投票等
                };

                //2. TODO 设置相关渲染页面可选择的编辑组件

            }
            //获取失败
            else{
                alert("系统出错，请稍后重试")
            }
        });
    };


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
        if (DesignDataSer.overallData.viewType == 'phoneView') {
            OverallDataSer.overallData.phoneView.showPhoneView = true;
        }
        //小程序页面预览
        else if (DesignDataSer.overallData.viewType == 'miniView') {


            OverallDataSer.overallData.miniView.showMiniView = true;
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
        init: init,
        viewPage: viewPage,
        savePage: savePage,
    }
});