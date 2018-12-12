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
// 采集足迹信息
export async function collectPrintInfo(params) {
  return request('/api/gather/entering', {
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
export async function querySimilarCases( params ) {
  return request('/api/query/queryfootprint', {
    method: 'POST',
    body: getSearchUrl(params),
  });
}
// 根据caseid查询所属图片
export async function queryCaseImg( params ) {
  return request('/api/query/queryimg', {
    method: 'POST',
    body: getSearchUrl(params),
  }, 'image');
}
// 将数组内的cases进行案件合并，并返回新的cases
export async function mergeCases( params ) {
  return request('/api/compare/footprintcompare', {
    method: 'POST',
    body: getSearchUrl(params),
  });
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
  a.onload = function(e) {callback(e.target.result);};
  a.readAsDataURL(blob);
}