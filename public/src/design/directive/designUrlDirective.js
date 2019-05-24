/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

/**
 * 组件页面
 */
designModule.directive('designWidget', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/widget.html'
    };
}]);

/**
 * 页面渲染
 */
designModule.directive('designRender', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render.html'
    };
}]);

/**
 * 对组件元素进行参数编辑
 */
designModule.directive('designEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit.html'
    };
}]);

/**
 * 编辑页面头部
 */
designModule.directive('designHeader', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/header.html'
    };
}]);


//***************************** 分别对组件edit和render的HTML页面数据进行渲染操作 ********************************
//paragraph
designModule.directive('designRenderParagraph', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/paragraph.html'
    };
}]);
designModule.directive('designEditParagraph', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/paragraph.html'
    };
}]);

//single_select
designModule.directive('designRenderSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/single_select.html'
    };
}]);
designModule.directive('designEditSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/single_select.html'
    };
}]);

//multi_select
designModule.directive('designRenderMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/multi_select.html'
    };
}]);
designModule.directive('designEditMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/multi_select.html'
    };
}]);











