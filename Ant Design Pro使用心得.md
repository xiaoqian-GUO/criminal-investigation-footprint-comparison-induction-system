## antd pro使用总结
- [antd pro官方文档](https://pro.ant.design/docs/getting-started-cn)
- [路由和菜单-添加路由/菜单](https://pro.ant.design/docs/router-and-nav-cn#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1/%E8%8F%9C%E5%8D%95)
- [新增页面的方法](https://pro.ant.design/docs/new-page-cn)
- [DvaJS](https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91)

### Install and Start
---
1. 
```
$ git clone --depth=1 https://github.com/ant-design/ant-design-pro.git my-project
$ cd my-project
```
2. npm install
3. npm start
4. compile成功后，访问http://localhost:8000即可

### 新增页面
---
1. 在src/pages/模块下面添加相对应的js以及less文件
2. 修改router.config.js文件的路由配置
3. 页面会自动实现路由页面的显示
4. 如果遇到国际化的情况，需要编写zh-CN.js文件，添加相对应的键值对

