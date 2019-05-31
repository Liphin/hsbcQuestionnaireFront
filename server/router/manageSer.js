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





