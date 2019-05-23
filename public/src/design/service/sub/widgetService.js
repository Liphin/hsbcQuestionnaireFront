/**
 * Created by Administrator on 2019/5/22.
 */

designModule.factory('WidgetSer', function (DesignDataSer) {

    /**
     * 添加新组件操作
     * 1、添加此新的组件到表单中
     * 2、对该新添加的组件进行编辑操作
     * @param type
     */
    let addNewWidget = function (type) {
        //1、添加此新的组件到表单中
        DesignDataSer.sheet.push(angular.copy(DesignDataSer.newWidgetData[type]));
        //2、对该新添加的组件进行编辑操作
        DesignDataSer.overallData.editRenderIndex = DesignDataSer.sheet.length - 1;
    };

    /**
     * 编辑该组件的数据
     */
    let editWidgetData = function (index) {
        DesignDataSer.overallData.editRenderIndex = index;
    };


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

    /**
     * 删除选项操作
     * @param index 选项下标位置
     */
    let deleteOption = function (index) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //删除数据集中对应的选项
        widget.data.option.splice(index, 1);
    };

    /**
     * 选项上移
     * @param index
     */
    let positionUp = function (index) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //原来位置大于0才能上移调整
        if (index > 0) {
            //拷贝一个即将粘贴过来的数据对象
            let newData = angular.copy(widget.data.option[index]);
            //删除数据集中对应的选项
            widget.data.option.splice(index, 1);
            //插入新数据到对应位置
            widget.data.option.splice(index - 1, 0, newData);
        }
    };

    /**
     * 选项下移
     * @param index
     */
    let positionDown = function (index) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //原来位置小于数组大小才能下移调整
        if (index < widget.data.option.length - 1) {
            //拷贝一个即将粘贴过来的数据对象
            let newData = angular.copy(widget.data.option[index]);
            //删除数据集中对应的选项
            widget.data.option.splice(index, 1);
            //插入新数据到对应位置
            widget.data.option.splice(index + 1, 0, newData);
        }
    };

    /**
     * 设置或取消设置为默认选中状态
     * @param index
     */
    let setAsDefault = function (index) {
        //对应表单组件信息
        let widget = DesignDataSer.sheet[DesignDataSer.overallData.editRenderIndex];
        //对应不同组件不同的初始化设置操作
        switch (widget.type) {
            case 'single_select': {
                //如果之前已选中默认值，再点一次取消选择，否则选择
                if (widget.data.selected == index) {
                    widget.data.selected = 'none'
                } else {
                    widget.data.selected = index;
                }
                break;
            }
            case 'multi_select': {
                widget.data.option[index].status = !widget.data.option[index].status;
                break;
            }
        }
    };


    return {
        editWidgetData: editWidgetData,
        addNewWidget: addNewWidget,
        addOptions: addOptions,
        deleteOption: deleteOption,
        positionUp: positionUp,
        positionDown: positionDown,
        setAsDefault: setAsDefault,
    }
});





