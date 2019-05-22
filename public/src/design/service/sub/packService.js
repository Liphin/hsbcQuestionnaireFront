/**
 * Created by Administrator on 2019/5/22.
 */

designModule.factory('PackSer', function (DesignDataSer) {

    /**
     * 组件生成最终HTML页面数据
     */
    let packSelectData = function () {
        //循环遍历每个设计组件的信息
        let phoneHtmlData = '';
        for (let i in DesignDataSer.sheet) {
            let widget = DesignDataSer.sheet[i];
            switch (widget.type) {
                case 'single_select': {
                    phoneHtmlData += singleSelectPackage(widget);
                    break;
                }
            }
        }
        return phoneHtmlData;
    };


    /**
     * 打包单项选择题目的操作，返回打包后的HTML数据
     * @param widget
     */
    let singleSelectPackage = function (widget) {
        let str = "<div style=\"font-weight: bold\">" + widget.data.title + "</div>";
        for (let i in widget.data.option) {
            str += "<div style=\"border: 1px solid gainsboro; border-width: 1px 0 0 0; padding: 5px 12px\">";
            str += "<label style=\"width: 100%;display: block\">";
            str += "<input type=\"radio\" value=\"" + i + "\" name=\"" + widget.type + i + "\">";
            str += "<span style=\"font-weight: normal\">" + widget.data.option[i] + "</span>";
            str += "</label>";
            str += "</div>";
        }
        return str;
    };


    return {
        packSelectData:packSelectData,
    }
});