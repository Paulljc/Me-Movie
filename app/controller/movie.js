/**
 * 处理电影控制逻辑
 */

const movieModel = require('../model/mongoose/model/movieModel');
const commentModel = require('../model/mongoose/model/commentModel');
const _ = require('underscore');//引入underscore

// GET detail page.
exports.detail = function(req, res) {
    // 取到 url '/detail/:id' 中的 id
    let id = req.params.id;

    movieModel.findById(id, function(err, movie) {
        // 取到该电影的评论数据
        commentModel.find({ movie: id }, function(err, comments) {
            console.log(comments);

            if (err) {
                console.log(err);
            }

            res.render('detail', {
                title: '电影详情页',
                movie: movie,
                comments: comments
            });
        });

    });
};

// GET add_movie page.
exports.add_movie = function(req, res) {
    res.render('add_movie', {
        title: '后台电影录入页',
        movie: {
            title: 'movie-name',
            doctor: 'me',
            country: '美国',
            year: '2018',
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: 'summary',
            language: '英语'
        }
    });
};

// add_movie page - post
exports.movie_save = function(req, res) {
    let id = req.body.movie._id;
    let movieObj = req.body.movie;
    let postMovie = null;

    // 若 id 存在则更新，不存在就创建
    if (id) {
        movieModel.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }

            // postMovie = Object.assign({}, movie, movieObj);
            // 用 underscore 替换对象
            postMovie = _.extend(movie, movieObj);//同理 将movieObj对象的所有属性复制给movie，再返回movie
            postMovie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }

                // 重定向
                res.redirect('/detail/' + movie._id);//回到更新后的电影详细页
            });
        });
    } else {
        postMovie = new movieModel({ //不存在则一项项创建
            title: movieObj.title,
            doctor: movieObj.doctor,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        });

        postMovie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            // 重定向
            res.redirect('/detail/' + movie._id);   //回到更新后的电影详细页
        });
    }
};

// GET movie-list page.
exports.movie_list = function(req, res) {
    movieModel.findAll(function(err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('movie_list', {
            title: '后台电影管理页',
            movies: movies
        });
    });
};

// movie- page - update
exports.movie_update = function(req, res) {
    let id = req.params.id;

    if (id) {
        movieModel.findById(id, function(req, movie) {
            res.render('add_movie', {
                title: '后台电影更新页',
                movie: movie
            });
        });
    }
};

// movie- page - delete
exports.movie_delete = function(req, res) {
    let id = req.query.id;

    if (id) {
        movieModel.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        });
    }
};
