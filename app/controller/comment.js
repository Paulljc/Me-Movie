
/**
 * 电影评论逻辑
 */

const commentModel = require('../model/mongoose/model/commentModel');

exports.comment_save = function(req, res) {
    let post_comment = req.body.comment;    //请求体中comment对象取出来
    let movie_id = post_comment.movie;      //评论的是哪个电影 用于下面重定向回到当前评论电影详细页

    let commentEntity = new commentModel(post_comment); //创建一个实例

    commentEntity.save(function(err, comment) {
        if (err) {
            console.log(err);
        }

        // 重定向
        res.redirect('/detail/' + movie_id);
    });
};
