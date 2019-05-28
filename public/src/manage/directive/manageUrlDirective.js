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