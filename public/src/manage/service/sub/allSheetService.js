/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('AllSheetSer', function ($cookies, $location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 加载所有表单数据
     */
    let loadAllSheet = function () {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.loadAllSheetUrl,
            {userid: OverallDataSer.overallData.user._id}, function (result) {
                if (result.status == 200) {
                    //赋值从后台获取的数据
                    ManageDataSer.allSheetData.length = 0;
                    for (let i in result.data) {
                        ManageDataSer.allSheetData.push(result.data[i]);
                    }
                }
                else if (result.status == 401) {
                    alert("数据加载失败，请稍后重试")
                }
            })
    };


    /**
     * 对创建过的表单进行操作
     * @param type
     * @param _id
     */
    let sheetOpt = function (type, _id) {
        switch (type) {
            case 'edit': {
                $location.path('/design/' + _id);
                break;
            }
            case 'analyse': {
                break;
            }
            case 'release': {
                break;
            }
            case 'qrcode': {
                break;
            }
            case 'copy': {
                break;
            }
            case 'delete': {
                break;
            }
        }
    };


    return {
        sheetOpt: sheetOpt,
        loadAllSheet: loadAllSheet,
    }
});




