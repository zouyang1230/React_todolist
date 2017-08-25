const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./cfg/dev.js');
const {dfPath} = require('./cfg/default');

let app = new ( require('express') )();

let port = 9003;

config.entry.unshift('webpack-hot-middleware/client?reload=true');

let compiler = webpack(config);

app.use( webpackDevMiddleware(compiler, {publicPath: '/assets/'}) );

app.use( webpackHotMiddleware(compiler) );

app.get('/*', (req, res)=> res.sendFile(dfPath.src + '/index.html') )

app.listen(port, (error)=>{
    if(!error){
        console.log('');
    }
});
