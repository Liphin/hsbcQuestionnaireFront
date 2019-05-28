/**
 * Created by Administrator on 2018/2/28.
 */
overallModule.controller('OverallCtrl', function ($http, $rootScope, $location, $timeout, OverallDataSer,
                                                  OverallSer, OverallGeneralSer, $cookies) {
    /******************************个人信息标签显示和隐藏设置**************************************/

    /*初始化必要变量*/
    $rootScope.loading = false;
    $rootScope.saveAnimate = false;
    $rootScope.overallData = OverallDataSer.overallData;
    $rootScope.zIndexHelper = OverallDataSer.zIndexHelper;

    //全局应用初始化方法
    OverallSer.initData();

    /**
     * 切换路由path
     */
    $rootScope.switchPath = function (path) {
        $location.path(path);
    };


    /**
     * 停止事件传递和禁用一些默认事件处理情况
     * @param $event
     */
    $rootScope.preventEventTransport = function ($event) {
        OverallSer.preventEventTransport($event);
    };


    /**
     * 电脑键盘按键按下操作
     * @param $event
     */
    $rootScope.keyboardDownOpt=function ($event) {
        OverallSer.keyboardDownOpt($event)
    };
    /**
     * 电脑键盘按键弹起操作
     * @param $event
     */
    $rootScope.keyboardUpOpt=function ($event) {
        OverallSer.keyboardUpOpt($event)
    };


    /**
     * 退出登录操作
     */
    $rootScope.signOut = function () {
        //重置数据
        OverallDataSer.overallData.user._id='';
        OverallDataSer.overallData.user.account='';
        $cookies.remove('_id');
        $cookies.remove('account');
        //跳转至登录页面
        $location.path('/login')
    };
});