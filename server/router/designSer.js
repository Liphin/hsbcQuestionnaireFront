/**
 * Created by Administrator on 2019/5/22.
 */

const fs = require('fs');
const express = require('express');
const serverData = require('../serverSerData');
const router = express.Router();

/**
 * 保存问卷数据
 */
router.post('/saveSheetData', (req, res, next) => {

    //console.log(req.body);
    let param = req.body;
    let filePath = serverData.resourcePath + "/html/" + param.uniqueId + ".html";

    //查询是否已经存在文件，若已经存在则先删除
    fs.access(filePath, error => {
        if (!error) {
            console.log('文件已存在，删除旧文件', filePath);
            //删除文件
            fs.unlinkSync(filePath);
        }

        //文件写入
        fs.writeFile(filePath, param.htmlData,  function(err) {
            if (err) {
                console.error('文件数据写入失败', err);
                res.sendStatus(400);
            }else {
                console.debug('文件数据写入成功', filePath);
                res.sendStatus(200);
            }
        });
    });
});

module.exports = router;