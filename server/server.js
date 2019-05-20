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
const express = require('express'); //express网络框架
const request = require('request');
var uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
let serverData = require('./serverSerData');
var getUserInfoSer = require('./user/getUserInfoSer');
let jsSdkConfig = require('./jssdk/jsSdkConfigSer');

require('./db/mongo');

/**
 * 初始化操作
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let getUserInfo = new getUserInfoSer();
let jsSdk = new jsSdkConfig();

/**
 * 获取JS Ticket的方法
 */
app.get("/jsSdkConfig", function (req, res) {
    jsSdk.signJsSdk(req, res)
});

/**
 * 获取微信用户详细信
 */
app.get('/getWxUserInfo', function (req, res) {
    getUserInfo.getWxUserInfo(req, res);
});

/**
 * 用于https请求时响应
 */
if(global.env=='prod'){
    app.use("/public/assets", express.static('/root/powerh5/public/assets'));
    app.use(express.static('/root/powerh5/public'));

}else {
    app.use("/public/assets",express.static('G:\\SoftwareOutSourcing\\Peng\\H5\\movie\\五四青年主题\\project\\public\\assets'));
    app.use(express.static('G:\\SoftwareOutSourcing\\Peng\\H5\\movie\\五四青年主题\\project\\public'));
}
app.use("/public/assets", express.static(serverData.basePath + '/assets'));
app.use(express.static(serverData.basePath));


//开启监听端口
app.listen(3023);
console.log('Server proxy on port 3023');








