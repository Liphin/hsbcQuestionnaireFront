/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.controller('DesignCtrl', function (DesignDataSer) {

    let design = this;
    design.overallData = DesignDataSer.overallData;
    design.widget = DesignDataSer.widget;
    design.sheet = DesignDataSer.sheet;

});