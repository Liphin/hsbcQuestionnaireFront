/**
 * Created by Administrator on 2019/6/10.
 */
manageModule.factory('SystemManage', function ($location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 初始化系统管理数据
     */
    let initSystemManageData = function () {
        //获取系统管理的地址参数
        let param = $location.search();
        //1、查看系统管理数据分析中的目标分析类型和条目
        if (!OverallGeneralSer.checkDataNotEmpty(param.type) || !OverallGeneralSer.checkDataNotEmpty(param.item)) {
            //若type或item为空则重新进入路由
            $location.url('/manage/systemManagement?type=sheet&&item=type');
            return;
        }

        //2、分别设置目标分析数据类型和条目
        ManageDataSer.systemManage.type = param.type;
        ManageDataSer.systemManage.statistic[param.type].item = param.item;

        //3、加载所有参与者的问卷数据
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getSystemManagePersonDataUrl, null,
            result => {
                //保存人次数统计分析数据
                ManageDataSer.systemManage.statistic.person.data = result;

                //设置问卷统计分析数据
                ManageDataSer.systemManage.statistic.sheet.data.length = 0; //数据清空
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