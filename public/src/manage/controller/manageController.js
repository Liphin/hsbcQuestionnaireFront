/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.controller('ManageCtrl', function (ManageDataSer) {
    let manage = this;
    manage.overallData = ManageDataSer.overallData;
    manage.sheetType = ManageDataSer.sheetType;


});