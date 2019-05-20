/**
 * Created by Administrator on 2018/12/30.
 * node程序主入口
 */

/**
 * 设置目标环境变量的值
 */
global.env = process.env.TARGET_ENV;
//如果未设置目标环境，则默认为dev环境
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}

/**
 * 模块及组件引用
 */
const fs = require('fs');
const https = require('https');
const express = require('express'); //express网络框架
const request = require('request');
const bodyParser = require('body-parser');
const serverData = require('./serverSerData');
require('./db/mongo');


/**
 * 初始化操作
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/aPLup5NS9o.txt", express.static(serverData.basePath) + "/aPLup5NS9o.txt");
app.use("/resource", express.static(serverData.resourcePath));
app.use("/public/assets", express.static(serverData.projectPath + '/assets'));
app.use("/", express.static(serverData.projectPath));


/**
 * 开启http和https服务
 */
var privateKey = fs.readFileSync(serverData.targetSetting.certConfig.key);
var certificate = fs.readFileSync(serverData.targetSetting.certConfig.cert);
var credentials = {key: privateKey, cert: certificate};

/**
 * 如果部署到生产环境则用https协议打开端口，否则直接使用http协议端口
 */
if (global.env == 'prod') {
    https.createServer(credentials, app).listen(serverData.port); //开启http设置s配置
} else {
    app.listen(serverData.port);
}
console.log('Server proxy on port: ', serverData.port, ' , on environment: ', global.env);








