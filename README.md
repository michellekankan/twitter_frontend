# Twitter-frontend
A Twitter-like frontend project, implemented using React.

## How to Start
npm start

## How to Access
http://localhost:3000/

## API request
request: get post put patch delete //提供方法
service: const getUser = (params) => get('/user', params).then((res) => {
  return res;
});

## A backend web service 
using json-server

## Twitter Frontend Page Template
You can directly follow the screenshots of the Twitter pages in the doc directory to develop the frontend UI pages.

## React 五步法
- 第一步: 將設計好的UI劃分劃分為組建層級
- 第二步: 用React創建一個靜態版本
- 第三步: 確定UI state的最小(且完整)表示

## style 技術選擇
- css 無法編寫嵌套
- scss 寫簡單的嵌套 -> css
- css module 不用關係命名空間, 不會出現會被覆蓋的樣式

## 工程畫的配置信息
- craco.config.js : 配置webpack文件的快捷方式
- jsconfig.json : 給vscode使用的js相關配置文件 