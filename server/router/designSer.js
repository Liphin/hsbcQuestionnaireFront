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
const dbName = "hsbc";//mongodb中的数据库
const resultDom = "result";//mongodb中的sheet文档库
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
 * 组件及其类型数据
 */
let widgetResultClassify = {
    single: ['single_select', 'single_scale', 'pull_single_select'],
    multi: ['multi_select'],
    matrix_single: ['matrix_single_select', 'matrix_single_scale'],
    matrix_multi: ['matrix_multi_select'],
    fill: ['single_fill', 'matrix_fill', 'detail_fill'],
};

/**
 * 提交表单信息
 */
router.post('/submitResult', function (req, res) {
    let param = req.body;

    mongo.connectToMongo(function (db) {

        //1、插入participant文档
        db.db(dbName).collection(participantDom).insertOne(param, function (err, response) {
            if (response.result.n == 1) {
                //2、更新result文档
                let resultData = {};

                //对每个表单组件进行数据提交操作
                for (let i in param.sheet) {
                    let widget = param.sheet[i];

                    //根据不同表单类型进行相应数据提交方式
                    //单选方式
                    if (widgetResultClassify.single.indexOf(widget.type) > -1) {
                        let selected = widget.data.selected;
                        let resultKey = 'result.' + widget.timestamp + '.' + selected;
                        resultData[resultKey] = 1;
                    }
                    //多选方式
                    else if (widgetResultClassify.multi.indexOf(widget.type) > -1) {
                        for (let j in widget.data.option){
                            if(widget.data.option[j].status){
                                let resultKey = 'result.' + widget.timestamp + '.' + j;
                                resultData[resultKey] = 1;
                            }
                        }
                    }
                    //矩阵单选
                    else if (widgetResultClassify.matrix_single.indexOf(widget.type) > -1) {
                        for(let j in widget.data.choice){
                            let selected = widget.data.choice[j].selected;
                            let resultKey = 'result.' + widget.timestamp + '.' + selected;
                            resultData[resultKey] = 1;
                        }

                    }
                    //矩阵多选
                    else if (widgetResultClassify.matrix_multi.indexOf(widget.type) > -1) {
                        for(let j in widget.data.choice){
                            for(let h in widget.data.choice[j].selected){
                                if(widget.data.choice[j].selected[h]){
                                    let resultKey = 'result.' + widget.timestamp + '.' + j + '.' + h;
                                    resultData[resultKey] = 1;
                                }
                            }
                        }

                    }
                    //填空，暂时只存储在participant不存储在result中
                    else if (widgetResultClassify.fill.indexOf(widget.type) > -1) {}
                }
                //对文档进行数据库操作
                db.db(dbName).collection(resultDom).updateOne({sheetid: new mongodb.ObjectID(param.sheetid)},
                    {$inc: resultData}, function (err, response) {
                        if (response.result.n == 1) {
                            console.log("插入participant及result文档成功");
                            db.close();
                            res.send({status: 200});
                        }
                        //提交失败，返回
                        else {
                            console.log("插入result文档失败");
                            db.close();
                            res.send({status: 401});
                        }
                    });
            }
            //提交失败，返回
            else {
                console.log("插入participant文档失败");
                db.close();
                res.send({status: 401});
            }
        });
    });


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

//如果同时需要使用$inc和$set进行更新则不能使用$set直接更新对象，
//因为$set和$inc同时修改同一个对象时会被重写覆盖，因此只能$set针对某个具体元素进行赋值，不能与$inc有交集
//{$inc:{}, $set:{}}


module.exports = router;