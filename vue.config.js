const path = require("path");
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    pluginOptions:{
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                path.resolve(__dirname, "./src/assets/init.less")
            ]
        }
    },
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}