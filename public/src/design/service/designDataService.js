/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

designModule.factory('DesignDataSer', function () {

    let overallData = {
        editRenderIndex: 0,
    };


    //问卷、表单页面
    let sheet = [
        {
            type: 'matrix_single_select',
            data: {
                title: '这里输入题干信息',
                option: [
                    {text: '极好'},
                    {text: '满意'},
                    {text: '一般'},
                    {text: '不满'},
                    {text: '极差'}
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
                {name: '矩阵单选', type: 'matrix_single_select', font: 'fa fa-list'},
                {name: '量表题', type: 'single_scale', font: 'fa fa-power-off'},
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
        paragraph: {
            type: 'paragraph',
            data: {
                html: '<p><span>请输入相关文本信息描述</span></p>'
            },
        },
        single_select: {
            type: 'single_select',
            data: {
                title: '这里输入题干信息',
                selected: 'none',
                option: [
                    {text: '选项1'},
                    {text: '选项2'},
                    {text: '选项3'},
                ]
            },
        },
        multi_select: {
            type: 'multi_select',
            data: {
                title: '这里输入题干信息',
                option: [
                    {text: '选项1', status: true},
                    {text: '选项2', status: false},
                    {text: '选项3', status: false},
                ]
            },
        },
        matrix_single_select: {
            type: 'matrix_single_select',
            data: {
                title: '这里输入题干信息',
                option: [
                    {text: '极好'},
                    {text: '满意'},
                    {text: '一般'},
                    {text: '不满'},
                    {text: '极差'}
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
        }

    };

    return {
        overallData: overallData,
        widget: widget, //所有可选择的组件
        sheet: sheet, //问卷、表单页面
        newWidgetData: newWidgetData, //新添加的组件填充数据
    }
});