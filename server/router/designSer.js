/**
 * Created by Administrator on 2019/5/22.
 */

const fs = require('fs');
const express = require('express');
const mongo = require('../db/mongo');
const mongodb = require('mongodb');
const miniSer = require('../wechat/mini/miniSer');
const serverData = require('../serverSerData');
const router = express.Router();
const sheetDom = "sheet";//mongodb中的sheet文档库


//******************************* 小程序端操作 ***************************************
/**
 * 获取用户openid
 */
router.post('/getUserOpenId', function (req, res, next) {
    miniSer.getUserOpenId(req, res);
});

/**
 * 获取带参数的二维码图片
 */
router.post('/getQrCode', function (req, res, next) {
    miniSer.getQrCode(req, res);
});


//******************************** 程序数据集操作 ************************************

/**
 * 获取指定_id的sheet数据
 */
router.post('/getTargetSheet', function (req, res) {
    mongo.findDocuments(sheetDom, {_id: new mongodb.ObjectID(req.body._id)}, response => {
        console.log(response);
        res.send({
            status: 200,
            data: response,
        });
    })
});


/**
 * 保存表单数据
 * 1、保存数据到MongoDB数据库中
 * 2、表单数据到文件HTML中
 */
router.post('/saveSheetData', (req, res, next) => {
    //1、解析携带的参数
    let param = req.body;

    //2、保存文件到MongoDb数据库中
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, {sheet: param.sheetData},
        response => {
            console.log('更新文档结果', response.result);

            //3、保存文件到HTML操作
            let filePath = serverData.resourcePath + "/html/" + param._id + ".html";

            //查询是否已经存在文件，若已经存在则先删除
            fs.access(filePath, error => {
                if (!error) {
                    console.log('文件已存在，删除旧文件', filePath);
                    //删除文件
                    fs.unlinkSync(filePath);
                }

                //文件写入
                fs.writeFile(filePath, param.htmlData, function (err) {
                    if (err) {
                        console.error('文件数据写入失败', err);
                        res.sendStatus(400);
                    } else {
                        console.debug('文件数据写入成功', filePath);
                        res.sendStatus(200);
                    }
                });
            });
        }
    )
});


/**
 * 获取所有开放的统计数据
 */
router.post('/getAllStatistics', function (req, res) {
    mongo.findDocuments(sheetDom, {open: true}, response => {
        res.send(response);
    })
});


router.post('/submitResult', function (req, res) {

});


// mongo.insertOneDocuments("sheet", {"uniqueid":"1_1558854148255","sheet":[{"type":"single_select","data":{"required":true,"title":"这里输入题干信息","selected":"none","option":[{"text":"选项1"},{"text":"选项2"},{"text":"选项3"}]}}],"creatorid":1,"title":"测试表单测试表单测试表单测试表单测试表单测试表单","open":true,"type":"questionnaire"}, function (res) {
//     console.log('get response',res);
// });


module.exports = router;