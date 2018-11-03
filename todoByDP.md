# 需求记录

## 【20181024】

1. 个人基本信息(all type string)
    - username 用户名
    - name 用户姓名
    - userId  工号
    - email 邮箱
    - phone 手机号码
    - institution 所属机构

2. 用户管理：显示注册的用户，可以实现删除、查询、锁定、修改密码。可以新建。
    - 分页，指定每页条数
    - 操作管理弹窗
    - 样式
    - 修改用户密码和权限，用户名不可更改

查询用户数据 request url： /api/user
期望获取的数据
```js
{
    key: '1', // 唯一标识该条记录的 key
    username: 'John Brown',// 用户名
    password: '123456'
    authority: 'admin',// 用户角色 
}
```
删除用户数据  url   /api/deleteUser
```js
{
    status: 'ok' // 删除结果  'ok' or 'error'
    errorInfo: ''  // 删除失败的辅助提示信息
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