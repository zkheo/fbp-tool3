
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

module.exports = {
    publicPath,
    lintOnSave: false,
    devServer: {
        open: false, // 编译完成是否打开网页
        host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, // 访问端口
        https: false, // 编译失败时刷新页面
        hot: true, // 开启热加载
        hotOnly: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/test': {
                target: 'https://gateway-aio-test.gwm.cn', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/test': '',
                }
            },
            '/prod': {
                target: 'https://gateway-aio.gwm.cn', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/prod': '',
                }
            },
            '/tokent': {
                target: 'https://portal-aio-test.gwm.cn', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/tokent': '',
                }
            },
            '/tokenp': {
                target: 'https://portal-aio.gwm.cn', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/tokenp': '',
                }
            },
        },
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
    }
}
