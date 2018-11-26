export const siteName = 'temp'

// const host = window.location.hostname
const protocol = window.location.protocol
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
export const COMMIT_HASH = __COMMIT_HASH__

export const apiServer = getHost()
export const apibaseURL = apiServer + '/v1'
// export const apibaseURL = apiServer

export const wsServer = getwshost()
export const wsbaseURL = wsServer + '/v1'

export const QnCDN = 'https://o8uuin1yb.qnssl.com/'
export const QnUp = 'https://up.qbox.me/'

export const emptyPic =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

function getHost() {
  return `${protocol}//${ENV.host}`
}

function getwshost() {
  return `${wsProtocol}//${ENV.wsHost}`
}

export const pattMobile = new RegExp(/^(\+?0?86\-?)?1[345789]\d{9}$/)
export const pattIDCard = new RegExp(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/)
export const pattPassword = new RegExp(/.{8}/)
export const pattMobileMosaic = new RegExp(/(\d{3})\d*(\d{4})/)
export const pattNotes = new RegExp(/^([a-z0-9]{6})?$/)
export const pattFloat = new RegExp(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/) // 正浮点数

// 小程序名称可以由中文、数字、英文。长度在4-30个字符之间，一个中文字等于2个字符。
export const pattWXName = new RegExp(/^([^\x00-\xff]|[a-zA-Z0-9]){2,30}$/)
export const pattEnName = new RegExp(/^.{4,30}$/)

// 注册名称可以由中文、数字、下划线、英文。长度在4-30个字符之间，一个中文字等于2个字符。
export const pattUserName = new RegExp(/^([\u4e00-\u9fa5]|\w){2,30}$/)
