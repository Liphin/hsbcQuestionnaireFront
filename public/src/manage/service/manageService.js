/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageSer', function ($cookies, $routeParams, $location, ManageDataSer, OverallGeneralSer, OverallDataSer,
                                            AllSheetSer) {

    /**
     * 管理页面初始化操作
     */
    let init = function () {
        ManageDataSer.overallData.navigation = $routeParams.option;
        //如果是所有问卷路由则进入该方法
        if ($routeParams.option == 'allSheet') {
            //AllSheetSer.loadAllSheet();
        }
    };


    /**
     * 创建新的表单类型数据
     */
    let createNewSheet = function (sheetType) {
        //判断是否已输入标题，若未输入则输入
        if (OverallGeneralSer.checkDataNotEmpty(ManageDataSer.overallData.newSheet.title)) {
            let data = {
                userid: OverallDataSer.overallData.user._id,
                title: ManageDataSer.overallData.newSheet.title,
                type: sheetType,
                status: 1, //状态信息： 1：待发布状态，2：发布中状态
                open: true, //对于发布状态的消息，设置open字段记录是否开放结果查询
            };
            //post发送http请求数据创建新表单数据
            OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.createNewSheetUrl, data, function (result) {
                if (result.status == 200) {
                    //跳转链接，进入design界面
                    $location.path('/design/' + result.data);
                }
                else if (result.status == 401) {
                    alert("创建失败，请稍后重试")
                }
            })
        }
        //提醒客户输入标题
        else {
            alert("请填写标题信息");
        }
    };


    return {
        init: init,
        createNewSheet: createNewSheet,
    }
});