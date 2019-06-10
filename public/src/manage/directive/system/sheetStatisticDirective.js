/**
 * Created by Administrator on 2019/6/10.
 */
manageModule.directive('sheetStatisticType', function (OverallGeneralSer, ManageDataSer) {
    return {
        restrict: 'E',
        scope: {
            sheetData: '@'
        },
        template: '<div></div>',
        link: function (scope, element) {

            //监听数据集是否发生变化，若发生变化则重新渲染操作
            scope.$watch('sheetData', function (newValue, oldValue) {
                //监听数据存在时进行解析
                let sheetData = JSON.parse(newValue);
                if (OverallGeneralSer.checkDataNotEmpty(sheetData)) {
                    //数据初始化
                    let renObj = {}, renArray = [];
                    //遍历每个sheet数据添加到renObj中
                    for (let i in sheetData) {
                        //如果包含该key则自增
                        if (renObj.hasOwnProperty(sheetData[i].type)) {
                            renObj[sheetData[i].type]++
                        }
                        //若之前尚未存在该key则初始化为1
                        else {
                            renObj[sheetData[i].type] = 1;
                        }
                    }
                    //renObj装载到renArray中，进行highChart饼状图解析
                    for (let j in renObj) {
                        renArray.push({
                            name: ManageDataSer.allSheetType[j].name,
                            y: renObj[j],
                        });
                    }
                    //对数据进行饼状图渲染
                    renderPieChar(renArray);
                }
            });

            /**
             * 饼状图渲染
             */
            let renderPieChar = function (renArray) {
                Highcharts.setOptions({
                    colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
                });
                Highcharts.chart(element[0], {
                    chart: {
                        width: 750,
                        height: 450,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                    },
                    title: {
                        text: '各问卷类型统计占比'
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:15px;color: #248dc2;font-weight: bold">{point.key}</span>',
                        pointFormat: '<span style="font-size: 15px; color: black"> 占比 </span>' +
                        '<span style="font-size: 15px;color: #248dc2;font-weight: bold">{point.percentage:.1f}%</span>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<span style="font-size: 15px; color: black">{point.name}: {point.percentage:.1f} %</span>',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: '占比',
                        colorByPoint: true,
                        data: renArray
                    }]
                });
            }
        }
    }
});


manageModule.directive('sheetStatisticTime', function () {
    return {
        restrict: 'E',
        link: {}
    }
});