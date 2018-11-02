import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export function getAllUserinfo(params) {
  return request('/api/getCurrentUser',{
    method: 'POST',
    body: params,
  });
}
export function updateUserInfo(params) {
  return request('/api/updateUserInfo',{
    method: 'POST',
    body: params,
  });
}
export function updatePwd(params) {
  return request('/api/updatePwd',{
    method: 'POST',
    body: params,
  });
}
// 采集足迹信息
export function collectPrintInfo(params) {
  return request('/api/collectPrintInfo',{
    method: 'POST',
    body: params,
  });
}