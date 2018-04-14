
// MVC模式 这里将路由 和 路由处理函数 进行了分离 清晰明了
const indexController = require('../app/controller/index');
const movieController = require('../app/controller/movie');
const userController = require('../app/controller/user');
const commentController = require('../app/controller/comment');
const categoryController = require('../app/controller/category');

module.exports = function(app) {
    /**
     * pre handle user
     * 不推荐使用 app.locals.user = req.session.user; 避免别的客户端也拿到了 user，造成环境污染
     * user 的session信息存放在 res.locals 中变成本次生命周期变量，在每个模板页面中都能拿到，不用每次都用render传递user
     */

    app.use(function(req, res, next) {
        res.locals.user = req.session.user; //拿到用户session信息
        next();
    });

    // index  ok
    app.get('/', indexController.index);

    // movie
    app.get('/detail/:id', movieController.detail);//get 调用detail方法 用req.params.id取得具体点击了哪个 ok
    //调用add_movie方法 后台电影录入页 渲染add_movie.pug
    app.get('/admin/add_movie', userController.user_req, userController.admin_req, movieController.add_movie);
    // 更新电影 存在则为修改 不存在则为更新  调用movie_save方法  ok
    app.post('/admin/new', userController.user_req, userController.admin_req, movieController.movie_save);
    //点击进入后台电影管理页 渲染  ok
    app.get('/admin/movie_list', userController.user_req, userController.admin_req, movieController.movie_list);
    //点击更新电影信息页面 根据点击的是哪一部传入的id  调用movie_update方法  渲染  ok
    app.get('/admin/movie_update/:id', userController.user_req, userController.admin_req, movieController.movie_update);
    //删除电影业务逻辑 调用movie_delete 删除不用带id是因为已经独立出来了delete.js文件 直接执行完逻辑就删除行  ok
    app.delete('/admin/movie_list', userController.user_req, userController.admin_req, movieController.movie_delete);

    // comment  从detail页面中发送请求过来 post调用comment_save方法 ok
    app.post('/detail/comment', userController.user_req, commentController.comment_save);

    // category
    //渲染添加电影分类页面 ok
    app.get('/admin/add_category', userController.user_req, userController.admin_req, categoryController.add_category);
    //保存电影业务逻辑  ok
    app.post('/admin/save_category', userController.user_req, userController.admin_req, categoryController.save_category);
    //调用category_list方法     渲染电影分类列表    ok
    app.get('/admin/category_list', userController.user_req, userController.admin_req, categoryController.category_list);

    // user
    app.get('/signup', userController.show_signup);//get调用show_signup 用户注册页    ok
    app.get('/signin', userController.show_signin);//get调用show_signin 用户登录页    ok
    app.post('/user/signup', userController.signup);//post调用signup 用户注册   ok
    app.post('/user/signin', userController.signin);//post调用signin 用户登录   ok
    app.get('/user_logout', userController.user_logout);//get调用user_logout 用户注销页    ok
    //get调用add_user 后台管理添加新用户页面  ok
    app.get('/admin/add_user', userController.user_req, userController.admin_req, userController.add_user);
    //get调用save_user 后台管理保存用户信息业务逻辑  ok
    app.post('/admin/save_user', userController.user_req, userController.admin_req, userController.save_user);
    //get调用user_list 后台管理用户列表页  ok
    app.get('/admin/user_list', userController.user_req, userController.admin_req, userController.user_list);
    //get调用user_update 后台修改用户信息页  中间件为以下三个函数 :id 说明user_update 要从req.params.id取值    ok
    app.get('/admin/user_update/:id', userController.user_req, userController.admin_req, userController.user_update);
    //get调用user_delete 后台删除用户业务逻辑  ok
    app.delete('/admin/user_list', userController.user_req, userController.admin_req, userController.user_delete);
};
