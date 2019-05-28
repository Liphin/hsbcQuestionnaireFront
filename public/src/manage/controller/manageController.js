/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.controller('ManageCtrl', function (ManageDataSer, ManageSer) {
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