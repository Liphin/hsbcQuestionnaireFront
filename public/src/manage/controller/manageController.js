/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.controller('ManageCtrl', function (check, ManageDataSer, ManageSer) {
    //检查是否登录状态
    if (!check) return;

    let manage = this;
    manage.overallData = ManageDataSer.overallData;
    manage.allSheetType = ManageDataSer.allSheetType;

    /**
     * 创建新的表单类型
     * @param sheetType
     */
    manage.createNewSheet = function (sheetType) {
        ManageSer.createNewSheet(sheetType);
    }

});