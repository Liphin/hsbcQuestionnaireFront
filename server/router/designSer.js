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
const participantDom = "participant";//mongodb中的sheet文档库


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
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, {
            sheet: param.sheetData,
            timestamp: param.timestamp
        },
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


/**
 * 设置sheet发布状态
 */
router.post('/releaseConfig', function (req, res) {
    let param = req.body;
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, {status: param.status}, response => {
        console.log('设置开放状态结果: ', response.result);
        //更新文档成功
        if (response.result.n == 1) {
            res.send({
                status: 200,
            })
        }
        //更新失败
        else {
            res.send({
                status: 401,
            })
        }
    })
});

/**
 * 提交表单信息
 */
router.post('/submitResult', function (req, res) {
    let param = req.body;
    //1、插入participant文档
    mongo.insertOneDocuments(participantDom, param, response => {

    });

    //2、更新sheet文档
    mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param.sheetid)}, {}, response => {

    })

});

// //更新数组或对象数据
// mongo.updateOneDocuments(sheetDom, {_id: new mongodb.ObjectID("5cee0521b0b5983a14b1a39a")},
//     {'sheet.3.data.option.0.status': true}, response => {console.log(response.result)})

// //自增叠加更新：可多级创建新子元素，不能自动创建数组，result.2 这种将以对象方式对待
// mongo.connectToMongo(function (db) {
//     var updateStr = {$inc: {'sheet.3.data.option.0.result.2': 1}};
//     db.db("hsbc").collection(sheetDom).updateOne({_id: new mongodb.ObjectID("5cee0521b0b5983a14b1a39a")}, updateStr, function (err, res) {
//         console.log(res.result)
//         db.close();
//     });
// });



module.exports = router;