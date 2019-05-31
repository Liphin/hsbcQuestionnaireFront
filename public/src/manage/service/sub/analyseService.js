/**
 * Created by Administrator on 2019/5/30.
 */

manageModule.factory('AnalyseSer', function ($location, ManageDataSer, OverallGeneralSer, OverallDataSer) {

    /**
     * 初始化分析数据
     */
    let initAnalyseData = function () {

        //1、获取目标问卷的index
        let param = $location.search();

        //如果目标问卷id参数为空处理规则且
        if (!OverallGeneralSer.checkDataNotEmpty(param._id)) {
            //若参数为空则取第一个页面元素_id，若问卷页面总数大于0则跳转，否则停止向下运行
            if (ManageDataSer.allSheetData.length > 0) {
                $location.url('/manage/analyseSheet?_id=' + ManageDataSer.allSheetData[0]._id)
            } else {
                return
            }
        }

        for (let i in ManageDataSer.allSheetData) {
            if (param._id == ManageDataSer.allSheetData[i]._id) {
                ManageDataSer.analyseData.sheetIndex = i; //记录目标数据的index
            }
        }

        //2、清空之前数据
        for (let i in ManageDataSer.analyseData.result) {
            delete ManageDataSer.analyseData.result[i];
        }

        //3、获取提交表单数据结果
        OverallGeneralSer.httpPostJsonData(OverallDataSer.urlData.getTargetResultUrl, {sheetid: param._id}, result => {
            if (result.status == 200) {
                //重新赋值result对象数组
                for (let i in result.data[0].result) {
                    ManageDataSer.analyseData.result[i] = result.data[0].result[i];
                }

            }
            //获取数据失败
            else {
                alert("系统出错，请稍后重试");
            }
        })
    };


    /**
     * 获取某问题的序号
     * @param index
     */
    let getQuestionnaireNum = function (index) {
        //遍历问题表单到index前的每个选项，去除所有为paragraph类型的数据
        let paraNum = 0;
        let targetSheet = ManageDataSer.allSheetData[ManageDataSer.analyseData.sheetIndex];
        for (let i = 0; i < index; i++) {
            if (targetSheet.sheet[i].type == 'paragraph') {
                paraNum++;
            }
        }
        return index - paraNum + 1; //从1开始
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
            //matrix类型百分比计算
            case 'matrixPercent': {
                let num = data > 0 ? data : 0;
                let total = 0;
                for (let i in data2) {
                    total += data2[i];
                }
                return (parseFloat(num) / total * 100).toFixed(2);
            }
            //matrix类型汇总计算
            case 'matrixSum': {
                let total = 0;
                for (let i in data) {
                    for (let j in data[i]) {
                        total += data[i][j];
                    }
                }
                return total;
            }
        }
    };


    return {
        getQuestionnaireNum: getQuestionnaireNum,
        initAnalyseData: initAnalyseData,
        getStatisticNum: getStatisticNum,
    }
});