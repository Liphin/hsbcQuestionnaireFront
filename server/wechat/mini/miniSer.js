/**
 * Created by Administrator on 2019/5/25.
 */
const fs = require('fs');
const url = require('url');
const util = require('util');
const axios = require("axios");
const request = require('request');
const miniGeneralSer = require('./miniGeneralSer');
const serverSerData = require('../../serverSerData');
const serverGeneralSer = require('../../serverGeneralSer');

/**
 * 获取携带参数的二维码图片
 */
let getQrCode = function (response) {
    // //获取access_token操作
    miniGeneralSer.getAccessToken(response, () => {
        let getParamQrCodeUrl = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s";
        let url = util.format(getParamQrCodeUrl, serverSerData.overallData.mini.access_token);

        //1、TODO 设置明确的param参数值
        let param = '20131003499_1558776614842';

        let filePath = serverSerData.resourcePath + "/qrcode/" + param + ".jpg";
        //通过axios方式调用接口
        axios.post(url, {scene: param}, {responseType: 'stream'})
            .then((res) => {
                fs.access(filePath, error => {
                    if (!error) {
                        console.log('带参数图片文件已存在，删除旧文件', filePath);
                        fs.unlinkSync(filePath); //删除旧文件
                    }

                    res.data.pipe(fs.createWriteStream(filePath));
                    console.debug('带参数qrCode图片文件数据写入成功', filePath);
                    if (serverGeneralSer.checkDataNotEmpty(response)) {
                        response.sendStatus(200);
                    }
                })
            });
    });
};


module.exports = {
    getQrCode: getQrCode,
};