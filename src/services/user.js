import request from '@/utils/request';

export async function query() {
  return request('/api/manage/queryallusers');
}

export async function queryCurrent(params) {
  return request('/api/currentUser', {
    method: 'POST',
    body: params,
  });
}

export async function addUser(params) {
  return request('/api/manage/adduser', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}

export async function deleteUser(params) {
  return request('/api/manage/deleteuser', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}

export async function lockUser(params) {
  return request('/api/manage/lockuser', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}

// 管理员更新用户密码
export async function updateUserPassword(params) {
  return request('/api/manage/updateuserpassword', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}

export function getAllUserinfo() {
  return request('/api/manage/queryselfprofile', {
    method: 'POST',
  });
}
export function updateUserInfo(params) {
  var url = '/api/manage/updateuserprofile';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}

export function updatePwd(params) {
  var url = '/api/user/changepassword';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}

// 下面是案件管理：查询案件、删除案件、修改案件信息、新增案件、获取案件列表
// 获取案件列表
export async function queryAllCases() {
  return request('/api/manage/queryallcases');
}
// 新增按钮
export async function addCase(params) {
  return request('/api/manage/addcase', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 删除案件
export async function delCase(params) {
  return request('/api/manage/deletecase', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 修改案件信息
export function updateCaseInfo(params) {
  var url = '/api/manage/updatecaseprofile';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}
// 查询案件
export function queryCasesByInfo(params) {
  var url = '/api/manage/querycases';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}
//end

// 下面是串并案管理：查询串并案、删除串并案、修改串并案信息、获取串并案列表
// 获取串并案列表
export async function queryAllMergeCases() {
  return request('/api/manage/queryallmergecases');
}
// 删除串并案
export async function delMergeCase(params) {
  return request('/api/manage/deletemergecase', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 修改串并案信息
export function updateMergeCaseInfo(params) {
  var url = '/api/manage/updatemergecaseprofile';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}
// 查询串并案
export function queryMergeCasesByInfo(params) {
  var url = '/api/manage/querymergecases';
  var body = getSearchUrl(params);
  return request(url, {
    method: 'POST',
    body: body,
  });
}
//end

// 采集足迹信息
export async function collectPrintInfo(params) {
  return request('/api/gather/entering', {
    method: 'POST',
    body: params,
  });
}
// 采集案件信息
export async function collectCaseInfo(params) {
  return request('/api/gather/enteringcaseinfo', {
    method: 'POST',
    body: params,
  });
}

export async function startConclude(params) {
  return request('/api/compare/footprintcompare', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 查询所有的管辖案件
export async function queryCases() {
  return request('/api/query/queryallmycases', {
    method: 'POST',
  });
}
// 根据caseid查询所有的相似案件
export async function querySimilarCases(params) {
  return request('/api/query/queryfootprint', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 根据caseid查询所属图片
export async function queryCaseImg(params) {
  return request(
    '/api/query/queryimg',
    {
      method: 'POST',
      body: getSearchUrl(params),
    },
    'image'
  );
}
// 根据caseid查询所属图片--同步事件
export function queryImg(params) {
  return request(
    '/api/query/queryimg',
    {
      method: 'POST',
      body: getSearchUrl(params),
    },
    'image'
  );
}
// 将数组内的cases进行案件合并，并返回新的cases
export async function mergeCases(params) {
  return request('/api/compare/casemerge', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 根据caseid查询案件详情
export async function getDetails(params) {
  const { caseid } = params;
  const url = '/api/query/querycasedetail?caseid=' + caseid;
  return request(url);
}
// 实现拼接字符串
function getSearchUrl(params) {
  var url = '';
  var keys = Object.keys(params);
  if (keys.length > 0) {
    var i;
    for (i = 0; i < keys.length; i++) {
      url += keys[i] + '=' + params[keys[i]] + '&';
    }
    return url.slice(0, -1);
  } else {
    return url;
  }
}
//将blob对象转化为baseurl
function getBase64Other(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}
