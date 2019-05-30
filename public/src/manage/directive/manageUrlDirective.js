/**
 * Created by Administrator on 2019/5/27.
 */

/**
 * 管理界面头部html
 */
manageModule.directive('manageHeader', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/header.html'
    }
});

/**
 * 管理界面左侧导航栏html
 */
manageModule.directive('manageNavigation', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/navigation.html'
    }
});

/**
 * 管理界面右侧内容页面
 */
manageModule.directive('manageContent', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content.html'
    }
});


/**
 * 创建新的问卷表单
 */
manageModule.directive('manageCreateSheet', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/create_sheet.html'
    }
});
/**
 * 查看已有所有问卷表单
 */
manageModule.directive('manageAllSheet', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/all_sheet.html'
    }
});

/**
 * 数据统计与分析
 */
manageModule.directive('sheetAnalyse', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/sheet_analyse.html'
    }
});


/**
 * 数据统计与分析——段落描述
 */
manageModule.directive('sheetAnalyseParagraph', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/analyse/paragraph.html'
    }
});

/**
 * 数据统计与分析——选择题
 */
manageModule.directive('sheetAnalyseSelect', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/analyse/select.html'
    }
});

/**
 * 数据统计与分析——矩阵题
 */
manageModule.directive('sheetAnalyseMatrix', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/analyse/matrix.html'
    }
});