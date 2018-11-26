let path = require('path')
let glob = require('glob')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
const webpack = require('webpack')
const child = require('child_process')
// 获取当前分支commit
const commitHash = child.execSync('git rev-parse HEAD').toString()

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    basename,
    tmp,
    pathname

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry))
    // console.log(entry)
    tmp = entry.split('/').splice(-3)
    pathname = basename // 正确输出js和html的路径

    // console.log(pathname)
    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title: tmp[2],
      filename: tmp[2]
    }
  })
  return entries
}

let pages = getEntry('./src/pages/**?/*.html')
//配置end
module.exports = {
  lintOnSave: false, //禁用eslint
  productionSourceMap: false,
  pages,
  devServer: {
    index: 'index.html', //默认启动serve 打开index页面
    open: false,
    host: '',
    port: 17001,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 100
        return options
      })
    Object.keys(pages).forEach(entryName => {
      config.plugins.delete(`prefetch-${entryName}`)
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(() => [
        {
          path: path.join(__dirname, './dist'),
          filename: 'css/[name].[contenthash:8].css'
        }
      ])
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output = {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].[contenthash:8].js'
      }
      let plugins = [
        new webpack.ProvidePlugin({
          ENV: './team/' + (process.env.TEAM || 'PROD')
        }),
        new webpack.DefinePlugin({
          __COMMIT_HASH__: JSON.stringify(commitHash)
        })
        // new PrerenderSpaPlugin({
        //   staticDir: path.join(__dirname, 'dist'),
        //   routes: ['/', '/about']
        // })
      ]
      config.plugins = [...config.plugins, ...plugins]
    } else {
      return {
        plugins: [
          new webpack.ProvidePlugin({
            ENV: './team/' + (process.env.TEAM || 'PROD')
          }),
          new webpack.DefinePlugin({
            __COMMIT_HASH__: JSON.stringify(commitHash)
          })
        ]
      }
    }
  }
}
