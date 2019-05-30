/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('AllSheetSer', function ($cookies, $location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 加载所有表单数据
     */
    let loadAllSheet = function (callback) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.loadAllSheetUrl,
            {userid: OverallDataSer.overallData.user._id}, function (result) {
                if (result.status == 200) {
                    //赋值从后台获取的数据
                    ManageDataSer.allSheetData.length = 0;
                    for (let i in result.data) {
                        ManageDataSer.allSheetData.push(result.data[i]);
                        callback();
                    }
                }
                else if (result.status == 401) {
                    alert("数据加载失败，请稍后重试")
                }
            })
    };


    /**
     * 获取对应表单类型的logo
     * @param type
     */
    let getSheetTypeLogo = function (type) {
        for (let i in ManageDataSer.allSheetType) {
            if (type == ManageDataSer.allSheetType[i].type) {
                return ManageDataSer.allSheetType[i].fontIcon
            }
        }
    };


    //**************************************** 表单操作 ********************************************
    /**
     * 编辑操作
     */
    let editOpt = function (sheet) {
        //文档处于草稿状态，可以进入编辑
        if (sheet.status == 1) {
            $location.path('/design/' + sheet._id);
        }
        //当前文档处于发布状态，需停止后才能进入编辑页面
        else {
            alert("当前文档处于发布中状态，需停止后才能进行文档编辑")
        }
    };


    /**
     * 设置发布、停止状态
     */
    let releaseOpt = function (sheet, status) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.releaseConfigUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("系统出错，请稍后重试");
                }
            })
    };


    /**
     * 对创建过的表单进行操作
     * @param type
     * @param index
     * @param param
     */
    let sheetOpt = function (type, index, param) {
        let sheet = ManageDataSer.allSheetData[index];
        switch (type) {
            case 'edit': {
                editOpt(sheet);
                break;
            }
            case 'analyse': {
                $location.url('/manage/analyseSheet?_id=' + sheet._id)
                break;
            }
            case 'release': {
                releaseOpt(sheet, param);
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
        getSheetTypeLogo: getSheetTypeLogo,
    }
});




