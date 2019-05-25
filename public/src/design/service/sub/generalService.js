/**
 * Created by Administrator on 2019/5/25.
 */

designModule.factory('DesignGeneralSer', function (DesignDataSer) {

    /**
     * 获取某问题的序号
     * @param index
     */
    let getQuestionnaireNum = function (index) {
        //遍历问题表单到index前的每个选项，去除所有为paragraph类型的数据
        let paraNum = 0;
        for (let i = 0; i < index; i++) {
            if (DesignDataSer.sheet[i].type == 'paragraph') {
                paraNum++;
            }
        }
        return index - paraNum + 1 ; //从1开始
    };

    return {
        getQuestionnaireNum: getQuestionnaireNum,
    }
});