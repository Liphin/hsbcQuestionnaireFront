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
                    //根据创建时间先后排序
                    result.data.sort((a, b) => {
                        return b.timestamp - a.timestamp
                    });
                    //赋值从后台获取的数据
                    ManageDataSer.allSheetData.length = 0;
                    for (let i in result.data) {
                        ManageDataSer.allSheetData.push(result.data[i]);
                        if (callback != undefined) {
                            callback();
                        }
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

    /**
     * 获取对应表单类型的logo颜色
     * @param type
     */
    let getSheetTypeColor = function (type) {
        for (let i in ManageDataSer.allSheetType) {
            if (type == ManageDataSer.allSheetType[i].type) {
                return ManageDataSer.allSheetType[i].color
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
     * 删除对应表单数据
     */
    let deleteOpt = function (sheet) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.deleteSheetUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("删除出错，请稍后重试");
                }
            })
    };


    /**
     * 拷贝对应表单数据
     */
    let copyOpt = function (sheet) {
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.copySheetUrl,
            {_id: sheet._id, status: status}, result => {
                if (result.status == 200) {
                    //更新状态成功后，重新加载页面数据
                    loadAllSheet();
                }
                //更新失败
                else {
                    alert("拷贝出错，请稍后重试");
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
                $location.url('/manage/analyseSheet?_id=' + sheet._id);
                break;
            }
            case 'release': {
                releaseOpt(sheet, param);
                break;
            }
            case 'qrcode': {
                let qrCodeUrl = OverallDataSer.urlData.resourceBaseUrl + 'qrcode/' + sheet._id + ".jpg";
                ManageDataSer.overallData.miniView.sheetMiniQrCodeUrl = qrCodeUrl;
                ManageDataSer.overallData.miniView.downloadName = sheet.title + "_二维码";
                ManageDataSer.overallData.miniView.showMiniView = true;
                break;
            }
            case 'copy': {
                copyOpt(sheet);
                break;
            }
            case 'delete': {
                deleteOpt(sheet);
                break;
            }
        }
    };


    return {
        sheetOpt: sheetOpt,
        loadAllSheet: loadAllSheet,
        getSheetTypeLogo: getSheetTypeLogo,
        getSheetTypeColor: getSheetTypeColor,
    }
});




