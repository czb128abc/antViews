import request, { post, get } from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
export function login({ userName, password }) {
  const params = {
    phoneNumber: userName,
    userPassword: password,
  };
  return post('/api/systemuser/login', params);
}
export function queryUserInfo() {
  return post('/api/systemuser/userInfo');
}
export function logout() {
  return get('/api/systemuser/logout');
}
export function updatePassword(params) {
  return post('/api/systemuser/updatepassword', params);
}
