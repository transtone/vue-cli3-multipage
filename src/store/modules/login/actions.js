// 登录相关actions
import { login } from '@/store/api/user'

export function LoginByUsername({ commit, state }, userInfo) {
  return login(userInfo).then(rst => {
    if (rst.status === 200 && rst.data.code === 0) {
      commit('setToken', rst.data.data.token)
      commit('setPermissions', rst.data.data.permissions)
      commit('setUser', rst.data.data.user)
      return 'logined'
    } else {
      return rst.data
    }
  })
}
