/**
 * Created by Administrator on 2019/5/22.
 */

designModule.factory('WidgetSer', function (DesignDataSer) {

    /**
     * 添加选项操作
     */
    let addOptions = function () {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //根据不同组件类型执行相应的操作
        switch (widget.type) {
            //单选类型
            case 'single_select': {
                widget.data.option.push({text: '新选项'});
                break;
            }
        }
    };

    return {
        addOptions: addOptions,
    }
});