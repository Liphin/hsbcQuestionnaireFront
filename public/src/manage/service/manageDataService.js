/**
 * Created by Administrator on 2019/5/27.
 */
manageModule.factory('ManageDataSer', function () {
    let overallData = {
        navigation: 'allSheet', //导航类型

        //配置面板
        configPanel: {
            status: false, //是否打开状态
            sheetIndex: '', //需要设置其状态的的index
            configData: {
                open: '',
            }
        },

        //创建新的表单
        newSheet: {
            title: '',
        },

        //小程序预览操作
        miniView: {
            showMiniView: false, //是否展开小程序预览页面
            sheetMiniQrCodeUrl: '', //小程序二维码
            downloadName: '',//下载二维码名称
        },
    };

    //装载该用户发送过的所有问卷表单数据
    let allSheetData = [];


    //目标问卷统计
    let analyseData = {
        sheetIndex: '',
        result: {},
        participant: {},
        sheetClassify: {  //根据不同类型对应展示不同的分析结果数据
            paragraph: ['paragraph'],
            select: ['single_select', 'single_scale', 'pull_single_select', 'multi_select'],
            matrix: ['matrix_single_select', 'matrix_single_scale', 'matrix_multi_select'],
            fill_single: ['single_fill', 'detail_fill'],
            fill_matrix: ['matrix_fill',]
        }
    };


    //创建不同类型问卷有不同组件选择类型
    let allSheetType = [
        {
            type: 'questionnaire',
            name: '问卷',
            color: '#fd8c42',
            fontIcon: 'fa fa-newspaper-o',
            depict: '丰富题型，强大逻辑，问卷密码，红包抽奖',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        },
        {
            type: 'vote',
            name: '活动事件',
            color: '#508cc7',
            fontIcon: 'fa fa-futbol-o',
            depict: '活动事件，信息模板，信息统计，数据分析',
            widgetType: ['paragraph', 'single_select', 'single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        },
        {
            type: 'exam',
            name: '投票',
            color: '#ba5b9f',
            fontIcon: 'fa fa-bar-chart',
            depict: '图文视频，选项随机，实时排行，微信投票',
            widgetType: ['paragraph', 'single_select', 'single_scale', 'matrix_single_select', 'matrix_single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select']
        },
        {
            type: 'form',
            name: '考试',
            color: '#12ba57',
            fontIcon: 'fa fa-file-text-o',
            depict: '题库抽题，限时作答，成绩查询，自动阅卷',
            widgetType: ['paragraph', 'single_select', 'single_scale',
                'pull_single_select', 'multi_select', 'matrix_multi_select', 'single_fill', 'matrix_fill', 'detail_fill']
        }
    ];


    return {
        analyseData: analyseData,
        overallData: overallData,
        allSheetType: allSheetType,
        allSheetData: allSheetData,
    }
});