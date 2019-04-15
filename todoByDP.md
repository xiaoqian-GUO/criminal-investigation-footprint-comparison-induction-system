# 需求记录

## 【20181024】

1. 个人基本信息(all type string)
    - username 用户名
    - name 用户姓名
    - userId  警号
    - email 邮箱
    - phone 手机号码
    - institution 所属单位

2. 用户管理：显示注册的用户，可以实现删除、查询、锁定、修改密码。可以新建。
    - 新增：弹窗填写用户名、密码、权限 信息，提交时后台生成唯一key，需重新刷新请求数据（本地暂时用时间毫秒数模拟唯一key）
    - 修改：目前弹窗回显了当前行数据的值，并暂时设定三个子段全部可修改。权限应修改成下拉选择框待完成(//TODO)
    - 删除/锁定：传参唯一数据 key 给后台
    - 查询：根据 username 模糊匹配关键字，满足包含搜索关键字的项均给予展示

### API

1. 新增：POST /api/addUser
2. 修改  POST /api/updateUserInfo(这里如果跟个人信息修改url冲突就重新定义一个)
3. 删除  POST /api/deleteUser
4. 锁定  POST /api/lockUser
以上操作期望返回数据：
```js
{
    status: 'ok' // 操作结果  'ok' or 'error'
    errorInfo: ''  // 操作失败的辅助提示信息
}
```
5. 初始化获取用户数据 GET  /api/user
```js
{
    key: '1', // 唯一标识该条记录的 key
    username: 'John Brown',// 用户名
    password: '123456'
    authority: 'admin',// 用户角色 
}
```

## 问题记录

1. 为什么service里面request 函数 有的用了 async 而有的没有
2. reducer 里面需要谨记的问题：reducer 会先对比 state 引用地址，都不变默认无 diff.
```js
// 错误示例
addNewUser(state, { payload }) {
    const { data } = state;
    data.push({
        key: new Date().getTime(),
        ...payload,
    });
    return {
    ...state,
    data
    };
},
// 正确示范
addNewUser(state, { payload }) {
    const { data } = state;
    const newData = data.concat({
    key: new Date().getTime(),
    ...payload,
    });
    return {
    ...state,
    data: newData,
    };
},
```

## Fix 

[20181106] 
1. 用户列表 用 key 作为主键，与username 同一个值（和后端统一数据格式）
2. lock 操作锁定+解锁
3. 用户名不可修改
4. 添加重复用户名不能成功