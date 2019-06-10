/**
 * Created by Administrator on 2019/6/10.
 */
manageModule.factory('SystemManage', function (ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 初始化系统管理数据
     */
    let initSystemManageData = function () {
        //加载所有参与者的问卷数据
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getSystemManagePersonDataUrl, null,
            result => {
                //保存人次数统计分析数据
                ManageDataSer.systemManage.statistic.person.data = result;

                //设置问卷统计分析数据
                //数据清空
                ManageDataSer.systemManage.statistic.sheet.data.length = 0;
                //循环添加所有表单中目标数据
                for (let i in ManageDataSer.allSheetData) {
                    let item = ManageDataSer.allSheetData[i];
                    ManageDataSer.systemManage.statistic.sheet.data.push({
                        type: item.type,
                        timestamp: item.timestamp,
                    })
                }
            })
    };

    return {
        initSystemManageData: initSystemManageData,
    }
});