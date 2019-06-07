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
        templateUrl:'src/manage/tmpl/sub/content/create/create_sheet.html'
    }
});
/**
 * 查看已有所有问卷表单
 */
manageModule.directive('manageAllSheet', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/all/all_sheet.html'
    }
});

/**
 * 数据统计与分析
 */
manageModule.directive('sheetAnalyse', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/analyse/sheet_analyse.html'
    }
});


/**
 * 数据统计与分析——段落描述
 */
manageModule.directive('sheetAnalyseParagraph', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/analyse/sub/analyse_paragraph.html'
    }
});

/**
 * 数据统计与分析——选择题
 */
manageModule.directive('sheetAnalyseSelect', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/analyse/sub/analyse_select.html'
    }
});

/**
 * 数据统计与分析——矩阵单选题
 */
manageModule.directive('sheetAnalyseMatrix', function () {
    return {
        restrict: 'E',
        templateUrl:'src/manage/tmpl/sub/content/analyse/sub/analyse_matrix.html'
    }
});

/**
 * 数据统计与分析——单项填空题
 */
overallModule.directive('sheetAnalyseFillSingle', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/sub/analyse_fill_single.html'
    };
}]);

/**
 * 数据统计与分析——多项填空题
 */
overallModule.directive('sheetAnalyseFillMatrix', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/sub/analyse_fill_matrix.html'
    };
}]);

/**
 * 数据统计与分析——填空题详情数据
 */
overallModule.directive('sheetAnalyseTextDetail', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/analyse/sub/text_detail.html'
    };
}]);


/**
 * 小程序qrcode
 */
overallModule.directive('managePreviewMini', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/all/sub/mini_qrcode.html'
    };
}]);

/**
 * 发布问卷等的配置面板
 */
overallModule.directive('managePublishConfig', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/all/sub/publish_config.html'
    };
}]);

/**
 * 系统管理
 */
overallModule.directive('manageSystemManagement', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/manage/tmpl/sub/content/system/system_management.html'
    };
}]);


