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
                //返回是一个数据集，去第一条数据为目标sheet
                let targetSheet = result.data[0];
                //赋值表单页面编辑数据
                DesignDataSer.sheet.length = 0;
                for (let i in targetSheet.sheet) {
                    DesignDataSer.sheet.push(targetSheet.sheet[i]);
                }
                //赋值表单全局设置数据
                DesignDataSer.overallData.sheetConfig = {
                    _id: targetSheet._id,//唯一的id号，
                    userid: targetSheet.userid,//创建者id号
                    title: targetSheet.title,//标题
                    type: targetSheet.type,//表单类型：问卷、投票等
                    status: targetSheet.status,//表单状态：草稿，发布中等
                    open: targetSheet.open, //是否对外开放查询结果
                };

                //2. TODO 设置相关渲染页面可选择的编辑组件

            }
            //获取失败
            else {
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
            _id: DesignDataSer.overallData.sheetConfig._id,
            htmlData: fullPhoneHtmlData, //用于保存HTML数据到后台形成文件
            sheetData: DesignDataSer.sheet, //用于保存表单数据到数据库
        };

        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.saveSheetDataUrl, jsonData, function (result) {
            if (result == 'OK') {
                OverallGeneralSer.setFinishAnimation(1500, '保存完成');
            }
        });
    };



    return {
        init: init,
        viewPage: viewPage,
        savePage: savePage,
    }
});