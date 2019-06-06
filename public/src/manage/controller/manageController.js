/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.controller('ManageCtrl', function (check, $location, ManageDataSer, ManageSer, AllSheetSer, AnalyseSer) {
    //检查是否登录状态
    if (!check) return;

    let manage = this;
    manage.overallData = ManageDataSer.overallData;
    manage.analyseData = ManageDataSer.analyseData;
    manage.allSheetData = ManageDataSer.allSheetData;
    manage.allSheetType = ManageDataSer.allSheetType;
    ManageSer.init();

    /**
     * 初始化数据操作
     */
    manage.init = function () {
        ManageSer.init();
    };

    /**
     * 创建新的表单类型
     * @param sheetType
     */
    manage.createNewSheet = function (sheetType) {
        ManageSer.createNewSheet(sheetType);
    };

    /**
     * 更换左侧导航栏的路由
     */
    manage.changeNavigation = function (path) {
        $location.url(path)
    };

    /**
     * 对创建的表单进行操作
     */
    manage.sheetOpt = function (type, index, param) {
        AllSheetSer.sheetOpt(type, index, param);
    };

    /**
     * 获取对应表单类型的logo
     */
    manage.getSheetTypeLogo = function (type) {
        return AllSheetSer.getSheetTypeLogo(type)
    };

    /**
     * 获取对应表单类型的logo颜色
     */
    manage.getSheetTypeColor = function (type) {
        return AllSheetSer.getSheetTypeColor(type)
    };

    /**
     * 解析表单的时间
     */
    manage.parseSheetTime = function (timestamp) {
        let dataTime = new Date(timestamp);
        return dataTime.getFullYear() + "/" + (dataTime.getMonth() + 1) + "/" + dataTime.getDate() + "  " +
            dataTime.getHours() + ":" + dataTime.getMinutes() + ":" + dataTime.getSeconds();
    };

    /**
     * 问卷重命名操作
     */
    manage.renameSheet = function (_id, index) {
        AllSheetSer.renameSheet(_id, index);
    };


    //************************************ 数据统计分析 ******************************************
    /**
     * 获取问题序号，用于分析统计时使用
     */
    manage.getQuestionnaireNum = function (index) {
        return AnalyseSer.getQuestionnaireNum(index);
    };

    /**
     * 数据统计分析时一些数据计算
     */
    manage.getStatisticNum = function (type, data, data2) {
        return AnalyseSer.getStatisticNum(type, data, data2)
    };

    /**
     * 更换目标分析的表单数据
     */
    manage.changeAnalyseSheet = function (sheetid) {
        $location.search('_id', sheetid);
    };

    /**
     * 下载打印分析结果数据
     */
    manage.downloadResult = function () {
        AnalyseSer.downloadResult();
    };

    /**
     * 清空统计数据
     */
    manage.emptyResult = function () {
        AnalyseSer.emptyResult();
    };


    /**
     * 初始化表单发布的设置
     */
    manage. initSheetPublishConfig = function (index) {
        AllSheetSer.initSheetPublishConfig(index);
    };

    /**
     * 设置发布的问卷内容相关配置
     */
    manage.setPublishConfig = function () {
        AllSheetSer.setPublishConfig();
    }

});




