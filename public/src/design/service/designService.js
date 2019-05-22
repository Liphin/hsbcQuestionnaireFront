/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignSer', function (OverallDataSer, PackSer) {

    /**
     * 预览页面
     * 1、拼装组件并生成HTML数据
     * 2、保存该HTML到后台文件
     * 3、展示前端手机预览页面，iframe的url指向该地址
     * 4、生成携带参数的的小程序二维码
     */
    let viewPage = function () {
        //1、拼装组件并生成HTML数据
        let packHtmlData = PackSer.packSelectData();

        //2、保存该HTML到后台文件

        //OverallDataSer.overallData.phoneView.showPhoneView = true;
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