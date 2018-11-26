import { isEmpty } from 'ramda'
import { apibaseURL } from '@/config'
import Qs from 'qs'
import axios from 'axios'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: apibaseURL, // api的base_url
  timeout: 60000, // 请求超时时间
  transformRequest: [
    function(data) {
      data = Qs.stringify(data, { arrayFormat: 'repeat' })
      return data
    }
  ]
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.login.token
    if (store.getters.checkToken) {
      config.headers.common['Authorization'] = 'bearer ' + token
    }
    return config
  },
  error => {
    console.log(error) // for debug
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if (!store.getters.checkToken) {
      store.commit('clearData')
    }
    if (
      response.data &&
      !isEmpty(response.data.code) &&
      [100, 101].indexOf(response.data.code) !== -1
    ) {
      window.location.replace('/') // 100登录失败时跳转首页
    }
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default service
