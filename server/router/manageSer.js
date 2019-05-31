/**
 * Created by Administrator on 2019/5/27.
 */

const uuidv1 = require('uuid/v1');
const express = require('express');
const mongo = require('../db/mongo');
const mongodb = require('mongodb');
const serverData = require('../serverSerData');
const router = express.Router();
const sheetDom = "sheet";//mongodb中的sheet文档库
const resultDom = "result"; //mongodb中的result文档库
const participantDom = "participant"; //mongodb中的participant文档库


/**
 * 创建新表单操作
 */
router.post('/createNewSheet', function (req, res, next) {
    let param = req.body;
    //插入sheet文档
    mongo.insertOneDocuments(sheetDom, param, response => {
        console.log('插入sheet状态：', response.result);
        //创建新问卷表单数据成功，返回新创建的数据
        if (response.result.n == 1) {

            //插入result操作
            let newResultData = {
                sheetid: response.ops[0]._id,
                result: {}, //存放结果数据
            };
            mongo.insertOneDocuments(resultDom, newResultData, response2 => {
                console.log('插入result状态：', response2.result)
                //插入result文档成功
                if (response2.result.n == 1) {
                    res.send({
                        status: 200,
                        data: response.ops[0]._id
                    })
                }
                //插入result文档失败
                else {
                    res.send({
                        status: 401,
                    })
                }
            })
        }
        //创建新问卷表单数据，插入数据库失败
        else {
            res.send({
                status: 401,
            })
        }
    })
});


/**
 * 加载所有表单数据
 */
router.post('/loadAllSheet', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(sheetDom, param, response => {
        res.send({
            status: 200,
            data: response
        })
    })
});

/**
 * 删除对应表单
 */
router.post('/deleteSheet', function (req, res, next) {
    let param = req.body;
    //TODO 届时用Promise做并行处理，并每次复用db对象，无需连接3次, 并且需删除文件，若换成不生成文件形式可省却该步骤
    mongo.deleteOneDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.result.n > 0) {
            mongo.deleteManyDocuments(resultDom, {sheetid: new mongodb.ObjectID(param._id)}, response2 => {
                mongo.deleteManyDocuments(participantDom, {sheetid: param._id}, response3 => {
                    res.send({
                        status: 200
                    })
                })
            })
        }
        //sheet表单需要判断是否有删除数量大于0，result和participant表单无需判断删除数目问题，可能未有参与者提交信息
        else {
            console.log("删除sheet表单失败");
            res.send({
                status: 401
            })
        }
    })
});


/**
 * 拷贝对应表单
 */
router.post('/copySheet', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.length > 0) {
            let targetSheet = response[0]; //获取拷贝目标对象数据
            delete targetSheet._id; //自动创建的_id先对原先进行覆盖
            mongo.insertOneDocuments(sheetDom, targetSheet, response2 => {
                if (response2.result.n == 1) {
                    res.send({
                        status: 200
                    })
                }
                //创建失败
                else {
                    console.log('插入拷贝表单失败', response2);
                    res.send({
                        status: 402
                    })
                }
            })
        }
        else {
            console.log("获取对应表单失败");
            res.send({
                status: 401
            })
        }
    })
});

/**
 * 获取该表单数据填写数据结果
 */
router.post('/getTargetResult', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(resultDom, {sheetid: new mongodb.ObjectID(param.sheetid)}, response => {
        res.send({
            status: 200,
            data: response
        })
    })
});


/**
 * 获取目标参与人员提交的数据
 */
router.post('/getTargetParticipant', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(participantDom, {_id: new mongodb.ObjectID(param._id)}, response => {
        if (response.length > 0) {
            res.send({
                status: 200,
                data: response[0]
            })
        }
        //无数据返回
        else {
            console.log("获取参与人员所提交的数据失败：", response);
            res.send({
                status: 401,
            })
        }
    })
});


/**
 * 手机获取目标表单数据及其结果数据
 */
router.post('/getTargetSheetAndResult', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(sheetDom, {_id: new mongodb.ObjectID(param._id)}, sheetResponse => {
        //当数据不为空则继续
        if (sheetResponse.length > 0) {
            mongo.findDocuments(resultDom, {sheetid: new mongodb.ObjectID(param._id)}, resultResponse => {
                //当数据不为空则返回
                if (resultResponse.length > 0) {
                    res.send({
                        status: 200,
                        sheet: sheetResponse[0],
                        result: resultResponse[0],
                    })
                } else {
                    console.log("获取result数据失败");
                    res.send({
                        status: 402
                    })
                }
            })
        } else {
            console.log("获取sheet数据失败");
            res.send({
                status: 401
            })
        }
    })
});



module.exports = router;





