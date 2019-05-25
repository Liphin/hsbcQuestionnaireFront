/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignDataSer', function () {

    let overallData = {
        editRenderIndex: 0,
        viewType: 'phoneView',//phonView为快速预览、miniView为小程序预览
    };


    //问卷、表单页面
    let sheet = [
        {
            type: 'single_select',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                selected: 'none',
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ]
            },
        }
    ];


    //所有组件信息
    let widget = [
        {
            status: true, //展开状态：true、 收回状态：false
            name: '内容',
            sub: [
                {name: '文本描述', type: 'paragraph', font: 'fa fa-paragraph'},
            ]
        },
        {
            status: true, //展开状态：true、 收回状态：false
            name: '单选题',
            sub: [
                {name: '单选题', type: 'single_select', font: 'fa fa-circle'},
                {name: '量表题', type: 'single_scale', font: 'fa fa-power-off'},
                {name: '矩阵单选', type: 'matrix_single_select', font: 'fa fa-list'},
                {name: '矩阵量表', type: 'matrix_single_scale', font: 'fa fa-star-half-o'},
                {name: '下拉单选', type: 'pull_single_select', font: 'fa fa-caret-square-o-down'},
            ]
        },
        {
            status: true,
            name: '多选题',
            sub: [
                {name: '多选题', type: 'multi_select', font: 'fa fa-th-large'},
                {name: '矩阵多选', type: 'matrix_multi_select', font: 'fa fa-table'}
            ]
        },
        {
            status: true,
            name: '填空题',
            sub: [
                {name: '单项填空', type: 'single_fill', font: 'fa fa-tag'},
                {name: '矩阵填空', type: 'matrix_fill', font: 'fa fa-file-text-o'},
                {name: '详情填写', type: 'detail_fill', font: 'fa fa-file-word-o'}
            ]
        }
    ];

    /**
     * 新添加组件后填充的数据
     */
    let newWidgetData = {
        //*******************************************************************
        //文本描述
        paragraph: {
            type: 'paragraph',
            data: {
                html: '<p><span>请输入相关文本信息描述</span></p>'
            },
        },

        //*******************************************************************
        //单选题
        single_select: {
            type: 'single_select',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                selected: 'none',
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ],
            },
        },
        //量标题
        single_scale: {
            type: 'single_scale',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                selected: 'none',
                option: [
                    {text: '极差', value: 0},
                    {text: '不满', value: 1},
                    {text: '一般', value: 2},
                    {text: '满意', value: 3},
                    {text: '极好', value: 4}
                ]
            },
        },

        //矩阵单选
        matrix_single_select: {
            type: 'matrix_single_select',
            data: {
                required: true,
                title: '这里输入题干信息',
                option: [
                    {text: '极差'},
                    {text: '不满'},
                    {text: '一般'},
                    {text: '满意'},
                    {text: '极好'},
                ],
                choice: [
                    {
                        text: '外观',
                        selected: 'none',
                    },
                    {
                        text: '功能',
                        selected: 'none',
                    },
                ]
            }
        },
        //矩阵量表
        matrix_single_scale: {
            type: 'matrix_single_scale',
            data: {
                required: true,
                title: '这里输入题干信息',
                option: [
                    {text: '极差', value: 0},
                    {text: '不满', value: 1},
                    {text: '一般', value: 2},
                    {text: '满意', value: 3},
                    {text: '极好', value: 4},
                ],
                choice: [
                    {
                        text: '外观',
                        selected: 'none',
                    },
                    {
                        text: '功能',
                        selected: 'none',
                    },
                ]
            }
        },
        //下拉单选题
        pull_single_select: {
            type: 'pull_single_select',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                selected: '0',
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ]
            },
        },

        //*******************************************************************
        //多选题
        multi_select: {
            type: 'multi_select',
            data: {
                required: true,
                title: '这里输入题干信息',
                option: [
                    {text: '选项1', status: true},
                    {text: '选项2', status: false},
                    {text: '选项3', status: false},
                ]
            },
        },
        //矩阵多选
        matrix_multi_select: {
            type: 'matrix_multi_select',
            data: {
                required: true,
                title: '这里输入题干信息',
                option: [
                    {text: '极差'},
                    {text: '不满'},
                    {text: '一般'},
                    {text: '满意'},
                    {text: '极好'},
                ],
                choice: [
                    {
                        text: '外观',
                        selected: [],
                    },
                    {
                        text: '功能',
                        selected: [],
                    },
                ]
            }
        },

        //*******************************************************************
        //单项填空
        single_fill: {
            type: 'single_fill',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                value: '',
            }
        },
        //矩阵填空
        matrix_fill: {
            type: 'matrix_fill',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                option: [
                    {text: '姓名', value: ''},
                    {text: '国籍', value: ''},
                    {text: '工作', value: ''}
                ],
            }
        },
        //详情填空
        detail_fill: {
            type: 'detail_fill',
            data: {
                required: true, //必答、非必答选项
                title: '这里输入题干信息',
                value: '',
            }
        },
    };

    return {
        overallData: overallData,
        widget: widget, //所有可选择的组件
        sheet: sheet, //问卷、表单页面
        newWidgetData: newWidgetData, //新添加的组件填充数据
    }
});