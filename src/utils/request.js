import axios from 'axios';

// https://google.com/user
const domain = 'http://localhost:3333';
// 對於街口請求前的參數作轉換,主要添加統一的domain
axios.interceptors.request.use((config) => ({
  ...config,
  url: domain + config.url,
}));

// 對返回的結果做攔截,主要有兩部分: 數據轉換 錯誤處理
axios.interceptors.response.use((response) => response.data, (err) => Promise.reject(err));

// get 獲取服務器資源
export const get = (url) => axios.get(url);
// post 新增一個資源
export const post = (url, params) => axios.post(url, params);
// put 更新一個資源
export const put = (url, params) => axios.put(url, params);
// delete 刪除一個資源
export const del = (url, params) => axios.del(url, params);

export const patch = (url, params) => axios.patch(url, params);

/*
Axios 是一个基于 Promise 的 HTTP 客户端，用于在浏览器和 Node.js 环境中发送 HTTP 请求。它的主要功能包括：

发送 HTTP 请求：支持发送 GET、POST、PUT、DELETE、PATCH 等各种 HTTP 请求。
处理响应：可以拦截请求和响应，处理响应数据，并进行错误处理。
取消请求：支持取消请求功能。
自动转换 JSON 数据：自动将请求和响应的数据转换为 JSON。
支持防止跨站请求伪造（CSRF）：可以配置 CSRF 防护。
支持请求和响应的拦截器：可以在请求或响应被 then 或 catch 处理前拦截它们。
*/
