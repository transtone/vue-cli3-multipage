import fetch from '@/utils/fetch'

export function getUsers(formData) {
  return fetch({
    url: '/user/',
    method: 'get',
    params: formData
  })
}
export function login(formData) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: formData
  })
}

export function changePassword(formData) {
  return fetch({
    url: '/user/password',
    method: 'put',
    data: formData
  })
}

export function register(formData) {
  return fetch({
    url: '/user/register',
    method: 'post',
    data: formData
  })
}
