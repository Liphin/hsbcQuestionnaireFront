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
            type: 'single_select',
            data: {
                title: '选择一种颜色',
                selected: 'red',
                option: [
                    {text: '红色', value: 1},
                    {text: '黄色', value: 2},
                    {text: '橙色', value: 3},
                ]
            },
        },
    ];


    //所有组件信息
    let widget = [
        {
            status: true, //展开状态：true、 收回状态：false
            name: '内容',
            sub: [
                {name: '文本描述', type: 'text_describe', font: 'fa fa-paragraph'},
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

    return {
        overallData: overallData,
        widget: widget, //所有可选择的组件
        sheet: sheet, //问卷、表单页面
    }
});