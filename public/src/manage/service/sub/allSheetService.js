/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('AllSheetSer', function ($cookies, $location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 加载所有表单数据
     */
    let loadAllSheet = function () {
        //post请求
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.createNewSheetUrl, data, function (result) {
            if (result.status == 200) {
                //跳转链接，进入design界面
                $location.path('/design/' + result.data);
            }
            else if (result.status == 401) {
                alert("创建失败，请稍后重试")
            }
        })
    };


    return {
        loadAllSheet: loadAllSheet,
    }
});