/**
 * Created by Administrator on 2018/2/28.
 */

/**
 * 当有外来请求时候进行拦截，可以进行安全防范等操作或者进行页面跳转等。
 * use this to intercept all when there’s an outgoing server call and to turn it off when the call is completed.
 */
overallModule.factory('interceptHttp', function ($location, $rootScope) {

    return {
        /*成功请求数据*/
        request: function (receive) {
            if (receive.load != false) {
                $rootScope.loading++;
            }
            //console.log('request', $rootScope.loading, receive)
            return receive;
        },

        /*成功返回数据*/
        response: function (response) {
            $rootScope.loading--;
            //console.log('response', $rootScope.loading, response)
            return response
        },

        /*请求或返回数据出现错误*/
        requestError: function (err) {
            $rootScope.loading--;
            //console.log('requestError', $rootScope.loading)
            return err;
        },
        responseError: function (err) {
            $rootScope.loading--;
            //console.log('responseError', $rootScope.loading)
            return err;
        }
    };
});

/**
 * always we set the changing animation between page changeing
 */
overallModule.run(function ($rootScope, $timeout) {

    /*定义在config中每个path对应controller和view*/
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        $rootScope.loading++;
        //console.log('$routeChangeStart', $rootScope.loading)
    });

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $rootScope.loading--;
        //console.log('$routeChangeSuccess', $rootScope.loading)
    });

    /*所有URL跳转，不管是否在config中定义path*/
    $rootScope.$on('$locationChangeStart', function () {
        $rootScope.loading++;
        //console.log('$locationChangeStart', $rootScope.loading)
    });
    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.loading--;
        //console.log('$locationChangeSuccess', $rootScope.loading)
    });

});