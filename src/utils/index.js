import {
  QnCDN,
  pattMobileMosaic,
  pattMobile,
  pattPassword,
  pattIDCard
} from '@/config'
import store from '@/store'
import crypto from 'crypto'
import Identicon from 'identicon.js'

export function cleartoken() {
  window.localStorage.clear()
  store.commit('clearData')
}

export function getObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function cdnmedia(mediaid, opt) {
  if (opt) {
    if (opt.width && opt.height) {
      return `${QnCDN}${mediaid}?imageView2/1/w/${parseInt(
        opt.width
      )}/h/${parseInt(opt.height)}/interlace/1/q/90`
    } else if (opt.width) {
      return `${QnCDN}${mediaid}?imageView2/2/w/${parseInt(
        opt.width
      )}/interlace/1/q/90`
    } else if (opt.height) {
      return `${QnCDN}${mediaid}?imageView2/2/h/${parseInt(
        opt.height
      )}/interlace/1/q/90`
    } else {
      return `${QnCDN}${mediaid}`
    }
  }
  return `${QnCDN}${mediaid}`
}

export function getQueryString(url, name) {
  // console.log(url, name)
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)

  // console.log(url, name)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function formatmoney(
  s //s:传入的单位分数字 分回单位元数字
) {
  const n = 2
  s = s / 100
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  var l = s
      .split('.')[0]
      .split('')
      .reverse(),
    r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return (
    '￥' +
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  )
}

export function fen2yuan(money) {
  return (money / 100).toFixed(2)
}

export function yuan2fen(money) {
  return (money * 100).toFixed(2)
}

export function secret(name) {
  if (!name) {
    return ''
  }
  let reg = new RegExp('(.+)(.{1})(.+)')
  if (name.length > 3) {
    reg = new RegExp('(.+)(.{2})(.+)')
  }
  return name.replace(reg, '$1**$3')
}

export function secondToDate(result) {
  let h = String(Math.floor(result / 3600))
  if (h < 10) h = '0' + h
  let m = String(Math.floor((result / 60) % 60))
  if (m < 10) m = '0' + m
  let s = String(Math.floor(result % 60))
  if (s < 10) s = '0' + s
  return (result = h + ':' + m + ':' + s)
}

export const randStr = () => {
  return Math.random()
    .toString(36)
    .substr(2)
}

export const mosaicMobile = mobile => {
  return mobile.replace(pattMobileMosaic, '$1****$2')
}

export function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function imgUrl(name) {
  let hash = crypto.createHash('md5')
  hash.update(name) // 传入用户名
  let imgData = new Identicon(hash.digest('hex')).toString()
  return 'data:image/png;base64,' + imgData // 这就是头像的base64码
}
