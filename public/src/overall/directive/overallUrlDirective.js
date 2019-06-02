/**
 * Created by Administrator on 2018/2/28.
 */

/**
 * 退出登录页面
 */
overallModule.directive('overall', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/overall.html'
    };
}]);

/**
 * 退出登录页面
 */
overallModule.directive('signOut', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/signOut.html'
    };
}]);


/**
 * 执行完成动画
 */
overallModule.directive('finishAnimate', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/finishAnimate.html'
    };
}]);


/**
 * 加载动画
 */
overallModule.directive('loadAnimate', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/sub/loadAnimate.html'
    };
}]);


/**
 * 页面手机渲染视图，在编辑页面、管理页面均有使用到，因此放在overall中
 */
overallModule.directive('overallPreviewPhone', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/preview/phone.html'
    };
}]);
/**
 * 页面小程序效果查看，在编辑页面、管理页面均有使用到，因此放在overall中
 */
overallModule.directive('overallPreviewMini', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/preview/mini.html'
    };
}]);




