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
     * 添加选项操作
     */
    design.addOption= function () {
        WidgetSer.addOptions();
    };

    /**
     * 删除选项操作
     */
    design.deleteOption = function (index) {
        WidgetSer.deleteOption(index);
    };

    /**
     * 调整位置，上移一个位置
     */
    design.positionUp = function (index) {
        WidgetSer.positionUp(index);
    };

    /**
     * 调整位置，下移一个位置
     */
    design.positionDown = function (index) {
        WidgetSer.positionDown(index);
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






