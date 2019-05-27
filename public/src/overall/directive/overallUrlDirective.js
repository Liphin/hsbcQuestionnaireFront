/**
 * Created by Administrator on 2018/2/28.
 */
/**
 * 退出登录页面
 */
overallModule.directive('signOut', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/signOut.html'
    };
}]);


/**
 * 手机视图，在编辑页面、管理页面均有使用到，因此放在overall中
 */
overallModule.directive('overallPhoneView', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/overall/tmpl/phoneView.html'
    };
}]);





