/**
 * Created by Administrator on 2019/5/27.
 */

const uuidv1 = require('uuid/v1');
const express = require('express');
const mongo = require('../db/mongo');
const serverData = require('../serverSerData');
const router = express.Router();
const sheetDom = "sheet";//mongodb中的sheet文档库
const resultDom = "result"; //mongodb中的result文档库


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


module.exports = router;