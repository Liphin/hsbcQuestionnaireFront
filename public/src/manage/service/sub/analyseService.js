/**
 * Created by Administrator on 2019/5/30.
 */

manageModule.factory('AnalyseSer', function ($location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 表单数据分析
     * @param index
     * @param sheetid
     */
    let sheetStatistic = function (index, sheetid) {
        //1、数据初始化
        ManageDataSer.analyseData.sheetIndex = index;
        //清空之前数据
        for (let i in ManageDataSer.analyseData.result) {
            delete ManageDataSer.analyseData.result[i];
        }

        //2、获取提交表单数据结果
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getTargetResultUrl, {sheetid: sheetid}, result => {
            if (result.status == 200) {
                //重新赋值result对象数组
                for (let i in result.data[0].result) {
                    ManageDataSer.analyseData.result[i] = result.data[0].result[i];
                }
                //3、内容页面跳转
                $location.path('/manage/analyseSheet');
            }
            //获取数据失败
            else {
                alert("系统出错，请稍后重试");
            }
        })
    };


    /**
     * 数据统计分析时一些数据计算
     */
    let getStatisticNum = function (type, data, data2) {
        switch (type) {
            //小计统计
            case 'selectMinCount': {
                return data > 0 ? data : 0;
            }
            //百分比计算
            case 'selectPercent': {
                let num = data > 0 ? data : 0;
                let total = 0;
                for (let i in data2) {
                    total += data2[i];
                }
                return (parseFloat(num) / total * 100).toFixed(2);
            }
            //总数统计
            case 'selectSum': {
                let total = 0;
                for (let i in data) {
                    total += data[i];
                }
                return total
            }
        }
    };


    return {
        sheetStatistic: sheetStatistic,
        getStatisticNum: getStatisticNum,
    }
});