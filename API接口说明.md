# API 接口说明

## 【20181106】

### 登陆

1. 

### 获取当前用户详细信息

1. 

### 更该用户信息

1. 

### 更改密码

1. 

### 管理员获取所有用户

1. 

### 管理员编辑用户信息（修改密码）
1. 

### 锁定用户

1. 

### 删除用户

1. 

### 按照主键查询符合要求的用户

1. 


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