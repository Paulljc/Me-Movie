
/**
 * 用户模型
 */
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');//bcryptjs是一个第三方密码加密库，是对原有bcrypt的优化，优点是不需要安装任何依赖

const SALT_WORK_FACTOR = 10; //盐的强度 表示密码加密的计算强度，从1级到10级，强度越高，密码越复杂，计算时间也越长。

/**
 * 定义一个 Schema 模式
 * Schema 对象定义文档结构，可以定义字段、类型、唯一性、索引、验证等。
 * new Schema() 中传入一个 JSON 对象，定义属性和属性类型
 */

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    // 10   > normal user
    // 20   > verified user
    // 30   > super user
    // 100  > admin
    // 200  > super admin
    role: {
        type: Number,
        default: 10
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

/**
 * Schema 不仅定义了文档结构和使用性能，还可以有扩展插件、实例方法、静态方法、复合索引、文档生命周期钩子
 * pre('save') 每次 save 时都会调用此方法 使用pre中间件在用户信息存储前进行密码加密
 *      如果数据是新加的，创建时间、更新时间都显示当前时间
 *      如果数据已经有了，只更新时间显示当前时间
 */

userSchema.pre('save', function(next) {
    let user = this;

    if (this.isNew) {
        this.meta.createdAt = Date.now();
        this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
   
    //进行加密
    bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {    
        if (err) {
            return next(err);
        }

        bcryptjs.hash(user.password, salt, function(err, hash) { 
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
})

/**
 * 静态方法：model 调用的方法
 * findAll() 取出数据库所有数据
 * findById() 根据 id 取数据
 */

userSchema.statics = {
    findAll: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
};

/**
 * 实例方法：entity 调用的方法
 * comparePassword() 登录密码匹配
 */

userSchema.methods = {
    comparePassword: function(password, cb) {
        // this.password 数据库中的 password
        bcryptjs.compare(password, this.password, function(err, isMatch) { //密码验证 this.password是存在Schema的pw一致
            if (err) {
                return cb(err);
            }

            cb(null, isMatch);
        });
    }
}

module.exports = userSchema;
