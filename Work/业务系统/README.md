## 简介
index：项目登录、首页列表、用户中心、设备管理等模块;
HVST:高压专变产品;
HVB:高压分支产品;

## 前序准备
你需要在本地安装 [node]。本项目技术栈基于 [ES6]、[vue]、[vuex]、[vue-router] 、[axios] 和 [element-ui],[Mock.js]模拟。

## 开发
```bash

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:8080

## 发布
```bash

# 构建生产环境
npm run build
```

