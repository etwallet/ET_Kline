import cookie from 'js-cookie'

const STORAGE_TYPE_COOKIE = 'cookie'
const STORAGE_TYPE_LOCALSTORAGE = 'localStorage'

let storage = {}
//判断使用localStorage或cookie,默认使用localStorage
let save_type = STORAGE_TYPE_LOCALSTORAGE
if (typeof localStorage === 'object') {
  try {
    localStorage.setItem('localStorageTest', 1)
    localStorage.removeItem('localStorageTest')
  } catch (e) {
    save_type = STORAGE_TYPE_COOKIE
  }
}

save_type = STORAGE_TYPE_COOKIE

// 是否支持localStorage储存
storage.localStorage = save_type === STORAGE_TYPE_LOCALSTORAGE

storage.set = function (key, val) {
  switch(save_type){
    case STORAGE_TYPE_LOCALSTORAGE:
      localStorage.setItem(key, val)
      break
    case STORAGE_TYPE_COOKIE:
      cookie.set(key,val, { expires: 3650, domain:this.getDomain()})
      break
  }
}

storage.getDomain = function () {
  let host = window.location.host;
  if(!this.isIp(host)){
    let topDomain = host.match(/[\w-]+\.[\w]{2,3}$/g); //这个并不能匹配如com.cn的域名，但对我们够用了
    topDomain && (host = topDomain[0]);
  }
  return host
}
storage.isIp = function (host) {
  return /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/.test(host)
}

storage.get = function (key) {
  let val = ''
  switch(save_type){
    case STORAGE_TYPE_LOCALSTORAGE:
      val = localStorage.getItem(key)
      break
    case STORAGE_TYPE_COOKIE:
      val = cookie.get(key)
  }
  return val
}

export default storage