/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.controller('DesignCtrl', function (DesignDataSer, WidgetSer, DesignSer) {

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
    design.setAsDefault = function (index) {
        WidgetSer.setAsDefault(index);
    };


    /**
     * 预览页面数据结果
     */
    design.viewPage=function () {
        DesignSer.viewPage();
    }

});






