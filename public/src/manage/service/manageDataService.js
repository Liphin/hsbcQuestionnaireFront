/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageDataSer', function () {
    let overallData = {

        navigation: 'allSheet', //导航类型

        //创建新的表单
        newSheet:{
            title:'',
        }

    };

    //创建不同类型问卷有不同组件选择类型
    let allSheetType = [
        {
            type: 'questionnaire',
            name:'问卷',
            color:'#fd8c42',
            fontIcon:'fa fa-newspaper-o',
            depict:'丰富题型，强大逻辑，问卷密码，红包抽奖',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        },
        {
            type: 'vote',
            name:'考试',
            color:'#12ba57',
            fontIcon:'fa fa-file-text-o',
            depict:'题库抽题，限时作答，成绩查询，自动阅卷',
            widgetType: ['paragraph', 'single_select', 'single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        },
        {
            type: 'exam',
            name:'投票',
            color:'#ba5b9f',
            fontIcon:'fa fa-bar-chart',
            depict:'图文视频，选项随机，实时排行，微信投票',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select']
        },
        {
            type: 'form',
            name:'表单',
            color:'#508cc7',
            fontIcon:'fa fa-list-alt',
            depict:'信息登记，微信签到，活动报名，意见反馈',
            widgetType: ['paragraph', 'single_select', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']

        }
    ];


    return {
        overallData: overallData,
        allSheetType: allSheetType,
    }

});