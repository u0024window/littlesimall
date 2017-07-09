# littlesimall
mobile mall 为小思鞋店 微信公众号开发
## intro
react + react-router + antd-mobile + webpack
antd-mobile 是蚂蚁金服的react UI 框架 
文档：https://mobile.ant.design/docs/react/introduce-cn
github:https://github.com/ant-design/ant-design-mobile
## 调试工具
spy-debugger: https://github.com/wuchangming/spy-debugger
微信web开发工具
## 本地开发
### npm start
webpack-dev-server --open
* 动态编译sass文件
* 监听文件修改
### npm run beta
webpack
* 打包ji,css，但不压缩
* 压缩图片
### npm run build
* 打包ji,css,去掉warning 压缩js,css
* 压缩图片
