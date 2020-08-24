var glob = require('glob');
var path = require('path');

exports.getEntry = function(globPath) {
    var entries = {};
    var basename, tmp, pathname;
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        entries[basename] = entry;
    })
    console.log(entries);
    return entries;
}

//const glob = require("glob");
const PAGE_PATH = './src';  // 注意是./ 而不是../ 这可能和commen.js的加载有关系

exports.getPages = () => {
        //  首先得到包含pages文件夹里面符合条件的路径数组
        console.log('PAGE_PATH >>>', PAGE_PATH);
        let entryHtml = glob.sync(PAGE_PATH + '/*/*.js');

        console.log('entryHtml >>', entryHtml);

        //  pages就是vue.config.js里面pages选项的值，是一个对象
        let pages = {};

        //  遍历得到的路径数组，从字符串中分割出需要的页面名字
        entryHtml.forEach((filePath) => {
            let pathnameLen = filePath.split('/');
            let pathname = pathnameLen[pathnameLen.length - 2];
            console.log('pathname >>', pathname);
            let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
            console.log('fileName >>', fileName);

         //  组建pages需要的值
            pages[pathname] = {
                entry: `src/${pathname}/${fileName}.js`,
                template: `src/${pathname}/${fileName}.html`,
                filename: `${pathname}.html`,
                chunks: ['chunk-vendors', 'chunk-common', pathname]
            };
        });
        console.log('pages', pages);
        return pages;
};
