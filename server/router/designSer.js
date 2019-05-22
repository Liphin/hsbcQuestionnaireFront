/**
 * Created by Administrator on 2019/5/22.
 */

const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

/**
 * 保存问卷数据
 */
router.post('/saveQuestionnaireData', (req, res, next) => {
    req.send();
    //req.sendStatus();
});

module.exports = router;