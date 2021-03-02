module.exports = {
    //先写一个configureWebpack 表示你准备配置webpageconfig
    configureWebpack: {
        //配置路径相关的时候用resolve 可以解决路径相关的问题
        resolve: {
            //别名ps：.vue等相关的其实已经写了，这里只需要写我们自己需要的
            alias: {
                //默认有@  他指向的是：src
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                //router 一般情况下不用配置，因为只有在main.js中引用一次，如果有需要也可以在这里配置
                // 'router': '@/router'
            }
        }
    },
    // mode:"production" 或 "development"
    //process.env.NODE_ENV 获取当前的运行环境
    publicPath: process.env.NODE_ENV == 'production' ? "./" : "/", //打包的css/js文件程序相对路径 一般和你程序在服务器所在路径有关系
    assetsDir: 'statics/',//打包的静态文件(img js css)路径 , 一般要和 publicPath有对应
    devServer: { // 开发服务器
        port: '8090',
        proxy: {//代理
            '/search': {//请求路径
                target: "http://musicapi.leanapp.cn/", //真实请求的服务器地址
                changeOrigin: true //是否改变头部请求的域
            }
        }
    }
}