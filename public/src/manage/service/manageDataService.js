/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageDataSer', function () {
    let overallData = {

        navigation: 'createSheet',

    };

    //创建不同类型问卷有不同组件选择类型
    let sheetType = [
        {
            type: 'questionnaire',

        },
        {
            type: 'vote',

        },
        {
            type:'exam'
        },
        {
            type:'form',

        },
        {
            type:''
        }
    ];


    return {
        overallData: overallData,
        sheetType: sheetType,
    }

});