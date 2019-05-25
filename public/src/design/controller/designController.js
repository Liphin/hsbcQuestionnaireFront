/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.controller('DesignCtrl', function (DesignDataSer, WidgetSer, DesignSer, DesignGeneralSer, $http) {

    let design = this;
    design.overallData = DesignDataSer.overallData;
    design.widget = DesignDataSer.widget;
    design.sheet = DesignDataSer.sheet;

    /**
     * 添加新组件的操作
     */
    design.addNewWidget=function (type) {
        WidgetSer.addNewWidget(type);
    };

    /**
     * 获取问题序号
     */
    design.getQuestionnaireNum = function (index) {
        return DesignGeneralSer.getQuestionnaireNum(index);
    };

    /**
     * 编辑该组件的数据
     */
    design.editWidgetData = function (index) {
        WidgetSer.editWidgetData(index)
    };

    /**
     * 添加选项操作
     */
    design.addOption= function (param) {
        WidgetSer.addOptions(param);
    };

    /**
     * 删除选项操作
     */
    design.deleteOption = function (index,param) {
        WidgetSer.deleteOption(index,param);
    };

    /**
     * 调整位置，上移一个位置
     */
    design.positionUp = function (index, param) {
        WidgetSer.positionUp(index, param);
    };

    /**
     * 调整位置，下移一个位置
     */
    design.positionDown = function (index,param) {
        WidgetSer.positionDown(index,param);
    };

    /**
     * 设置或取消设置为默认选中选项
     */
    design.setAsDefault = function (index, param) {
        WidgetSer.setAsDefault(index, param);
    };

    /**
     * 预览页面数据结果
     */
    design.viewPage=function (viewType) {
        DesignSer.viewPage(viewType);
    };

    /**
     * 保存页面数据结果
     */
    design.savePage=function () {
        DesignSer.savePage();
    };

    /**
     * 提交问卷
     */
    design.submitSheet= function () {
        $http.post("/submitResult", design.sheet).success(function (response) {
            if(response=='OK'){
                alert("提交成功");
            }
        }).error(function (err) {
            alert("很抱歉，提交有误，请稍后重试");
        });
    };
});






