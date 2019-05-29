/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.controller('ManageCtrl', function (check, $location, ManageDataSer, ManageSer, AllSheetSer) {
    //检查是否登录状态
    if (!check) return;

    let manage = this;
    manage.overallData = ManageDataSer.overallData;
    manage.allSheetData = ManageDataSer.allSheetData;
    manage.allSheetType = ManageDataSer.allSheetType;
    ManageSer.init();

    /**
     * 创建新的表单类型
     * @param sheetType
     */
    manage.createNewSheet = function (sheetType) {
        ManageSer.createNewSheet(sheetType);
    };

    /**
     * 更换左侧导航栏的路由
     */
    manage.changeNavigation = function (path) {
        $location.path(path)
    };

    /**
     * 对创建的表单进行操作
     */
    manage.sheetOpt = function (type, index, param) {
        AllSheetSer.sheetOpt(type, index, param);
    };

    /**
     * 获取对应表单类型的logo
     */
    manage.getSheetTypeLogo= function (type) {
        return AllSheetSer.getSheetTypeLogo(type)
    };

    /**
     * 解析表单的时间
     */
    manage.parseSheetTime = function (timestamp) {
        let dataTime = new Date(timestamp);
        return dataTime.getFullYear() + "/" + (dataTime.getMonth() + 1) + "/" + dataTime.getDate() + "  " +
            dataTime.getHours() + ":" + dataTime.getMinutes() + ":" + dataTime.getSeconds();
    }
});




