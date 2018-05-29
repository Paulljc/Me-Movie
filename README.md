# Me-Movie
### Simple_Movie_Website

`git clone https://github.com/Paulljc/Me-Movie.git` 下载项目到本地

`npm install` 安装依赖

安装MongoDB 并开启服务 具体可以看看 Blog 中的指令 这里不做详细说明

开启数据库服务，然后用 `npm start` 启动项目

### 技术栈

#### 前端

- HTML/CSS/JS：前端必备三件套

- ES6：ECMAScript 新语法，必须要掌握

- Monment.js：时间日期格式化插件

- jQuery：主要用到 jQuery 的 ajax 方法处理表单异步请求和一些 DOM 操作

- Bootstrap： UI 框架，响应式

#### 后端

- pug：pug (以前叫 jade) 是一个高性能的模板引擎，用来生成 HTML

- Node.js：整个后端由 Node.js 驱动 ，用 npm 安装依赖包

- Express：一个基于 Node.js 平台的 web 开发框架，由路由和中间件构成

#### 数据库

- mongoDB：进行数据存储的 NoSQL 数据库(文档型)

- mongoose：Node.js 的 mongodb 驱动软件包，是进行 mongoDB 快速建模的工具

#### 自动化构建

- gulp：基于流的自动化构建工具,操作简单。建议可以学习一下主流的webpack

- JSHint：JS 代码校验

#### 依赖包

- underscore：underscore提供了一套完善的函数式编程的接口，让我们更方便地在JavaScript中实现函数式编程，会把自身绑定到唯一的全局变量_上。(自行了解)

- bcryptjs： bcryptjs是一个第三方密码加密库。

- connect-mongo：使session信息创建后储存在moogoose连接的数据库中。

- 新上传的数据库数据可以直接导入你的MongoDB中，用 mongorestore.exe -d db_name (文件夹所在目录) ，记得是要在数据库开启的时候导入

因为时间问题，很多细节没办法弄得很好，请谅解，后续有时间再进行更新。
