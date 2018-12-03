import request from '@/utils/request';

export async function query() {
  return request('/api/users');
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
  return request('/api/updateUserInfo', {
    method: 'POST',
    body: params,
  });
}
export function updatePwd(params) {
  return request('/api/updatePwd', {
    method: 'POST',
    body: params,
  });
}
// 采集足迹信息
export function collectPrintInfo(params) {
  return request('/api/collectPrintInfo', {
    method: 'POST',
    body: params,
  });
}
