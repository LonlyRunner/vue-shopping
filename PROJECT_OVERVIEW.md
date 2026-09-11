# Vue 移动商城说明

一个面向移动端的 Vue 2 商城前端，涵盖浏览商品、搜索、购物车、登录、下单和订单查看流程。

## 功能模块

- 首页、商品分类、购物车和个人中心
- 搜索、商品详情与订单支付页面
- 登录状态与受保护路由

## 技术栈

Vue 2、Vue Router、Vuex、Vant、Axios 与 Vue CLI。

## 本地运行

```bash
npm install
npm run serve
```

生产构建：`npm run build`。启动前请按实际后端服务调整接口配置。

## 目录

- `src/views/`：页面和布局
- `src/store/`：Vuex 状态
- `src/router/`：页面路由及登录守卫
- `style/`：全局样式

