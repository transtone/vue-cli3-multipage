import { mosaicMobile } from '@/utils'
import { isEmpty, findIndex, propEq, concat } from 'ramda'

export const token = state => state.login.token
export const user = state => {
  if (isEmpty(state.login.user)) {
    return ''
  } else {
    return mosaicMobile(state.login.user.Mobile.String)
  }
}

export const checkToken = state => {
  const token = state.login.token
  if (token === '') {
    return false
  } else {
    let jwtouttime
    try {
      jwtouttime = JSON.parse(atob(token.split('.')[1])).exp
    } catch (err) {
      jwtouttime = 0
    }
    return jwtouttime > Number(new Date()) / 1000
  }
}

export const checkAdmin = state => {
  return findIndex(propEq('Name', 'GetAdmins'))(state.login.permissions) !== -1
}

export const permissions = state => {
  const permission: any[] = []
  state.login.permissions.map(data => {
    permission.push(data.Name)
  })
  return permission
}

export const asideMenuConfig = state => {
  const noAuth = []
  let needAuth: any[] = []
  return concat(noAuth, needAuth)
}
