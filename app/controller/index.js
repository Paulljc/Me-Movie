
/**
 * 处理首页控制逻辑
 */

const movieModel = require('../model/mongoose/model/movieModel');

// index page
exports.index = function(req, res) {
    // console.log(req.session.user);
    // user 的 session 信息存放在 locals 中变成本地变量，在每个模板页面中都能拿到，不用每次都用 render 传递 user
    // app.locals.user = req.session.user;

    movieModel.findAll(function(err, movies) { //因为内层的Schema定义了静态方法，所以直接在model就可以查所有数据
                                                //执行完后exec(cb) 执行回调函数 也就是现在这个传进去的函数
        if (err) {
            console.log(err);
        }

        res.render('index', {   //查回来的数据传给模版
            title: '电影网站首页',
            movies: movies
        });
    });
};
