/**
 * Created by Administrator on 2019/5/27.
 */

const uuidv1 = require('uuid/v1');
const express = require('express');
const mongo = require('../db/mongo');
const serverData = require('../serverSerData');
const router = express.Router();
const domSheet = "user";//mongodb中的sheet文档库


/**
 * 登录操作
 */
router.post('/login', function (req, res, next) {
    let param = req.body;
    mongo.findDocuments(domSheet, param, response => {
        //该账号登录成功
        if (response.length > 0) {
            res.send({
                status: 200,
                data: response[0]._id, //返回第一条数据
            });
        }
        //该账号或密码填写有误
        else {
            mongo.findDocuments(domSheet, {account: param.account}, response => {
                //该账号存在，密码填写错误
                if (response.length > 0) {
                    res.send({
                        status: 401,
                    });
                }
                //该账号不存在
                else {
                    res.send({
                        status: 402,
                    });
                }
            })
        }
    })
});

/**
 * 注册操作
 */
router.post('/register', function (req, res, next) {
    let param = req.body;
    //查看该账号是否已经被注册过了
    mongo.findDocuments(domSheet, {account: param.account}, response => {
        if (response.length > 0) {
            //该账号已被注册，返回401
            res.send({
                status: 403
            });
        }
        else {
            //该账号尚未被注册过，进行注册该账号
            mongo.insertOneDocuments(domSheet, param, response => {
                //插入数据成功
                if (response.result.ok == 1) {
                    res.send({
                        status: 200,
                        data: response.ops[0]._id,
                    });
                }
                //插入数据失败
                else {
                    res.send({
                        status: 404,
                    });
                }
            })
        }
    });
});



module.exports = router;