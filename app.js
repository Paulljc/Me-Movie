const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); //图标
const logger = require('morgan'); //记录日志
const cookieParser = require('cookie-parser'); //解析cookie
const session = require('express-session'); //session可以和redis或者数据库结合做持久化操作，当服务器挂掉时也不会导致某些客户信息（购物车）丢失。
const bodyParser = require('body-parser'); //解析请求体
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session); //使session储存在moogoose连接的数据库中

// mongoose 🔗
let dbUrl = 'mongodb://127.0.0.1:27017/movie-website';
mongoose.connect(dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'));
db.once('open', function() {
    console.log('Mongodb started !');
});

let app = express();

// moment.js 处理时间格式
app.locals.moment = require('moment');//定义可以应用整个生命周期中使用的变量
//locals是Express应用中 Application(app) app.locals对象和Response(res) res.locals对象中的属性，该属性是一个对象。
// 该对象的主要作用是，将值传递到所渲染的模板中。res.locals，它只在这次请求的生命周期中有效。

// view engine setup
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({   //session配置     所有的路由添加一个session
    secret: 'gukson',   // 用来对session id相关的cookie进行签名
    resave: false,
    // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。建议false
    saveUninitialized: true,    // 是否自动保存未初始化的会话，建议false
    store: new mongoStore({ // 本地存储session（文本文件，或者选择其他store，比如redis的）
        url: dbUrl,
        collection: 'sessions'  //存在mongodb集合中
    })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

/**
 * 开发环境：
 * （显示报错信息、显示 HTTP 状态、美化 html 源代码、显示 mongoose debug 信息）
 */
if (app.get('env') === 'development') {
    app.set('showStackError', true);
    // express.logger 在express 4.0后已经迁出，现在为 morgan
    // app.use(express.logger(':method :url :status'));
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;//贯穿程序的整个生命周期
    mongoose.set('debug', true);
}

// routes.js 引进来后直接执行，app作为参数传入
require('./routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).render('error');
});

module.exports = app;
