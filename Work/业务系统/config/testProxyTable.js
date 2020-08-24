/** 
 * 测试系统的webpack代理路径
 */

module.exports = {
  //接口
  '/api': {
    target: 'http://cloud.epower-online.com/api/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
};
