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

export function addUser(params) {
  return request('/api/addUser', {
    method: 'POST',
    body: params,
  });
}

export function deleteUser(params) {
  return request('/api/deleteUser', {
    method: 'POST',
    body: params,
  });
}

export function lockUser(params) {
  return request('/api/lockUser', {
    method: 'POST',
    body: params,
  });
}

export function getAllUserinfo() {
  return request('/api/manage/queryselfprofile', {
    method: 'POST',
  });
}
export function updateUserInfo(params) {
  var url = '/api/manage/updateuserprofile';
  url = getSearchUrl(url, params);
  return request( url, {
    method: 'POST',
  });
}
export function updatePwd(params) {
  var url = '/api/user/changepassword';
  url = getSearchUrl(url, params);
  return request(url, {
    method: 'POST',
  });
}
// 采集足迹信息
export function collectPrintInfo(params) {
  return request('/api/collectPrintInfo', {
    method: 'POST',
    body: params,
  });
}

// 实现拼接字符串
function getSearchUrl(url, params){
  var keys = Object.keys(params);
  if(keys.length > 0){
    url += "?";
    var i;
    for(i=0;i<keys.length;i++){
      url += keys[i] + "=" + params[keys[i]] + "&";
    }
    return url.slice(0,-1);
  }
  else{
    return url ;
  }
}
