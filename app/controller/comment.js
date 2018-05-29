// 电影评论逻辑
const commentModel = require('../model/mongoose/model/commentModel');

// 发表评论
exports.comment_save = function(req, res) {
    let post_comment = req.body.comment;    
    let movie_id = post_comment.movie;      // 评论的是哪个电影 可用于下面重定向回到当前评论电影详细页

    let commentEntity = new commentModel(post_comment);

    commentEntity.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        res.redirect('/detail/' + movie_id);
    });
};
