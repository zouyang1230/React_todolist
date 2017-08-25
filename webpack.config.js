const path = require('path');

let env = process.env.NODE_ENV; //这里我是通过npm的script内的 "dev": "NODE_ENV=dev webpack"  定义的，运行dev时会执行赋值，然后运行webpack

module.exports = require(path.resolve(__dirname, 'cfg', env)); //最后会在cfg文件下找到dev.js
