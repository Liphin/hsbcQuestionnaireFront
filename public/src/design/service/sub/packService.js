/**
 * Created by Administrator on 2019/5/22.
 */

designModule.factory('PackSer', function (DesignDataSer, DesignGeneralSer) {

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
                    phoneHtmlData += singleSelectPackage(widget, i);
                    break;
                }
                case 'single_scale': {
                    phoneHtmlData += singleScalePackage(widget, i);
                    break;
                }
            }
        }
        return phoneHtmlData;
    };


    /**
     * 打包单项选择题目的操作，返回打包后的HTML数据
     * @param widget
     * @param i
     */
    let singleSelectPackage = function (widget, i) {
        let str = "<div style=\"padding: 20px 0;\">";
        str += "<div style=\"font-weight: bold\">" + DesignGeneralSer.getQuestionnaireNum(i) + "、" + widget.data.title + "</div>";
        str += "<div style=\"border: 1px solid gainsboro; border-radius: 7px ; margin-top: 10px\">";

        for (let j in widget.data.option) {
            str += "<div style=\"border: 1px solid gainsboro; border-width: 1px 0 0 0; padding: 5px 12px\">";
            str += "<label style=\"width: 100%;display: block\">";
            str += "<input type=\"radio\" value=\"" + j + "\" name=\"" + widget.type + i + "\">";
            str += "<span style=\"font-weight: normal;margin-left: 5px\">" + widget.data.option[j].text + "</span>";
            str += "</label></div>";
        }
        str += "</div></div>";
        return str;
    };


    /**
     * 打包量标题的操作，返回打包后的HTML数据
     * @param widget
     * @param i
     */
    let singleScalePackage = function (widget, i) {
        let str = "<div style=\"padding: 20px 0;\">";
        str += "<div style=\"font-weight: bold\">" + DesignGeneralSer.getQuestionnaireNum(i) + "、" + widget.data.title + "</div>";
        str += "<div style=\"margin-top: 10px\">";
        str += "<table class=\"table\"><tbody><tr>";
        str += "<td style=\"text-align: center;border: none\">" + widget.data.option[0].text + "</td>";
        str += "<td style=\"text-align: center;border: none\" colspan=\"" + (widget.data.option.length - 2) + "\" ></td>";
        str += "<td style=\"text-align: center;border: none\">" + widget.data.option[widget.data.option.length - 1].text + "</td>";
        str += "</tr><tr>";

        for (let j in widget.data.option) {
            str += "<td style=\"padding: 0\"><label style=\"width: 100%; text-align: center; padding: 8px\">";
            str += "<input type=\"radio\" value=\"" + j + "\" name=\"" + widget.type + i + "\">";
            str += "<span style=\"font-weight: normal\">" + widget.data.option[j].value + "</span>";
            str += "</label></td>";
        }
        str += "</tr></tbody></table></div></div>";
        return str;
    };


    /**
     * 打包多项选择题目的操作，返回打包后的HTML数据
     * @param widget
     * @param i
     */
    let multiSelectPackage = function (widget, i) {
        let str = "<div style=\"padding: 20px 0;\">";
        str += "<div style=\"font-weight: bold\">" + DesignGeneralSer.getQuestionnaireNum(i) + "、" + widget.data.title + "</div>";
        str += "<div style=\"border: 1px solid gainsboro; border-radius: 7px ; margin-top: 10px\">";
        for (let j in widget.data.option) {
            str += "<div style=\"border: 1px solid gainsboro; border-width: 1px 0 0 0; padding: 5px 12px\">";
            str += "<label style=\"width: 100%;display: block\">";
            str += "<input type=\"checkbox\" value=\"" + j + "\" name=\"" + widget.type + i + "\">";
            str += "<span style=\"font-weight: normal;margin-left: 5px\">" + widget.data.option[j].text + "</span>";
            str += "</label></div>";
        }
        str += "</div></div>";
        return str;
    };


    return {
        packSelectData: packSelectData,
        singleScalePackage: singleScalePackage,
        multiSelectPackage: multiSelectPackage
    }
});