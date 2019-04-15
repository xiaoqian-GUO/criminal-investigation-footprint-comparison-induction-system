# API 接口说明

## 【20181106】

### 登陆

1. 用户登陆时前端传输数据：
```js
{
    username: username, //当前登录用户的账户名
    password: password, //当前登录用户的密码
}
```
2. 期望后端传回的数据
```js
{
   status: '0'    // 操作结果  '0' or '1' or 'error', 其中 0 表示管理员，1 表示普通用户，error 表示用户登录失败
   errorInfo: ''  // 操作失败的辅助提示信息
}
```

### 获取当前用户详细信息

1. 前端传输数据：
```js
{
    currentUser: username, //当前登录用户的账户名
}
```
2. 期望后端传回的数据
```js
{
    status: "ok",                      //'ok' 表示信息获取成功  'error' 表示信息获取失败
    data: {
        username: 'xxxx',              //用户名
        name: 'xxxx',                  //用户姓名
        insitution: '西安电子科技大学', //所属单位
        phone: '18392089875',         //电话
        userid: '1610122398',         //警号
        email: '1843887878@163.com',  //邮箱
        locked: true                  //是否被锁定
    }
}
```

### 更该用户信息：锁定用户不允许修改

1. 前端传输数据：更新后的用户信息
```js
{
    username: 'xxxx',              //用户名
    name: 'xxxx',                  //用户姓名
    insitution: '西安电子科技大学', //所属单位
    phone: '18392089875',         //电话
    userid: '1610122398',         //警号
    email: '1843887878@163.com',  //邮箱
}
```
2. 期望后端传回的数据
```js
{
    status: 'ok',       // ok: 表示更新成功  error: 表示更新失败
    //errInfo
}
```

### 更改密码: 锁定用户不允许修改

1. 前端传输数据
```js
{
    username: 'xxxx',              // 用户名
    oldpwd: 'xxxx',                // 旧密码
    newpwd: 'xxxx',                // 新密码
    newpwdagain: 'xxxx',           // 再次输入新密码，可以不操作，前端验证两者是否相同，不相同不允许发起请求
}
```
2. 期望后端传回的数据
```js
{
    status: 'ok'       // ok: 表示密码更新成功  error: 表示密码更新失败
    errorInfo: "xxx"   // 操作失败时的说明
}
```

### 管理员获取所有用户

1. 前端直接发起 get 请求，不带参数

2. 期望后端传回的数据
```js
[
    {
    username: 'John Brown',  // 用户名,作为 **主键**
    password: '123456',      // 密码
    authority: 'admin',      // 权限，admin管理员，user普通用户
    locked: false,           // 是否锁定
    },
        //...
]

```
### 修改用户密码或权限

1. 前端传输数据
```js
{
    username: username,    // 用户名
    password: password,    // 密码
    authority: authority,  // 权限：admin or user
}
```
2. 期望后端传回的数据
```js
{
    status: 'ok',       // ok: 表示更新成功  error: 表示更新失败
    //errInfo
}
```

### 新增用户

1. 前端传输数据
```js
{
    username: username,    // 用户名
    password: password,    // 密码
    authority: authority,  // 权限：admin or user
}
```
2. 期望后端传回的数据
```js
{
    status: 'ok'       // ok: 新增用户成功  error: 新增用户失败
    //errInfo
}
```

### 锁定用户

1. 前端传参 username：如果用户已被锁定，此操作将解除锁定，修改locked字段为false，如果用户未被锁定，此操作将锁定用户，修改locked字段为true

2. 期望后端传回的数据
```js
{
    status: 'ok'       // ok: 锁定或解除锁定成功  error: 操作失败
    //errInfo
}
``` 

### 删除用户

1. 前端传参 username
2. 期望后端传回的数据
```js
{
    status: 'ok'       // ok: 操作成功  error: 操作失败
    //errInfo
}
```  
