#### API调整
---
##### 【20190417】

### 用户管理

1. 提供解除锁定操作：若当前用户已锁定，则当前操作解除锁定
2. 用户警号：6位数字，应该不是自动生成的

### 案件管理（支持案件录入、检索、修改和删除）

1. 获取所有案件列表：案件基本信息（/manage/queryallcases）

2. 案件录入（/gather/enteringcaseinfo）、修改（/manage/updatecaseprofile'）
```js
传输参数格式：
{
  caseid          案件编号
  caseStatus      案件状态
  time            案发时间
  location        案发地点
  institution     所属单位：黑龙江省公安厅 / 大庆市公安局 / 萨尔图区 ，其中/的个数分别代表省级、市级、区县级
  detail          简要案情
  caseType        案件类别
  enterType       侵入方式
  stolen          被盗物品
  persons         作案人数
}
```
3. 案件检索（/manage/querycases）
```js
传输参数格式：
{
  caseid          案件编号
  time            案发时间
  location        案发地点
  caseType        案件类别
  enterType       侵入方式
}
```
4. 案件删除（/manage/deletecase）
```js
传输参数格式：
{
  caseid          案件编号
}
```
###登陆

1. 需要在用户登陆时，根据用户所属单位，返回用户权限级别：省级、市级、区县级

### 串并案管理（获取串并案列表、删除串并案、修改串并案信息、检索串并案）

1. 获取串并案列表（/manage/queryallmergecases）

2. 修改串并案（/manage/updatemergecaseprofile）
```js
传输参数格式：
{
  mergecaseid     并案号
  mergecaseName   并案名称
  mergeTime       并案时间
  time            案发时间
  includeCases    包含案件号
  caseStatus      案件状态
}
```
3. 删除串并案（/manage/deletemergecase）
```js
传输参数格式：
{
  mergecaseid     并案号
}
```
4. 检索串并案（/manage/querymergecases）
```js
传输参数格式：
{
  mergecaseid     并案号
  mergecaseName   并案名称
  mergeTime       并案时间
  time            案发时间
  includeCases    包含案件号
  caseStatus      案件状态
}
```
