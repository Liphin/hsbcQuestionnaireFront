/**
 * Created by Administrator on 2019/5/22.
 */

const fs = require('fs');
const express = require('express');
const uuidv = require('uuid/v1');
const mongo = require('../db/mongo');
const serverData = require('../serverSerData');
const router = express.Router();

//mongodb中的sheet文档库
const domSheet = "sheet";

/**
 * 保存表单数据
 * 1、保存数据到MongoDB数据库中
 * 2、表单数据到文件HTML中
 */
router.post('/saveSheetData', (req, res, next) => {

    let param = req.body;

    //1、保存文件到MongoDb数据库中
    mongo.updateOneDocuments(domSheet, {uniqueId: param.uniqueId}, {sheet: param.dbData},
        response => {
            console.log('更新文档结果', response.result);

            //2、保存文件到HTML操作
            let filePath = serverData.resourcePath + "/html/" + param.uniqueId + ".html";

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


router.post('/submitResult', function (req, res) {


    res.sendStatus(200)
});


// mongo.insertOneDocuments("sheet", {
//     uniqueId: '5f2f48a0-7d2f-11e9-aac2-51d42dd428f6',
//     sheet:[],
//     creatorId:1,
// }, function (res) {
//     console.log('get response',res);
// });


module.exports = router;