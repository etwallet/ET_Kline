import axios from 'axios'
import storage from './storage'
import store from '../store'
import {API_BASE_URL, USER_CHECK_NAME, USER_MOBILE_SIGN_UP, USER_MOBILE_SIGN_UP_CODE, USER_EMAIL_SIGN_UP_CODE, USER_EMAIL_SIGN_UP, USER_SIGN_IN, USER_SIGN_OUT, USER_INFO, USER_SECURITY, USER_SET_PAYMENT_PASSWORD, USER_MODIFY_PAYMENT_PASSWORD, USER_MODIFY_PASSWORD, USER_BIND_EMAIL_CODE, USER_BIND_EMAIL, USER_BIND_MOBILE_CODE, USER_BIND_MOBILE, USER_GOOGLE_AUTH_KEY, USER_BIND_GOOGLE_AUTH, USER_UNBIND_GOOGLE_AUTH, USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE, USER_MOBILE_RESET_SIGN_IN_PASSWORD, USER_EMAIL_RESET_SIGN_IN_PASSWORD, USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE, USER_INVITE_REWARD_SUMMARY, USER_INVITE_REWARD_DETAIL, USER_MOBILE_RESET_PAYMENT_PASSWORD, USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE, USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE, USER_EMAIL_RESET_PAYMENT_PASSWORD, USER_BIND_GOOGLE_AUTH_CODE, USER_BIND_EMAIL_MOBILE_CODE, USER_BIND_MOBILE_EMAIL_CODE, USER_S3_INFO, USER_PAYMENT_BIND_ALIPAY, USER_PAYMENT_BIND_WECHAT, USER_PAYMENT_BIND_BANK} from './url.js'
import notice from '../utils/notice'

import {SET_USER, CLEAN_USER, SET_INVITE_REFERRAL_CODE, SET_PAYMENT_PASSWORD_STATUS, SET_USER_NAME, SET_CRYPTO_CURRENCY, CURRENCY_TO_CURRENCY} from '../store/mutation-types'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let user = {}

user.init = function () {
  let access_token = storage.get('at')
  let name = storage.get('name')
  let has_payment_password = storage.get('hpp')
  let referral_code = storage.get('rf')
  let crypto_currency = storage.get('ccy')
  let currency_to_currency = storage.get('ctc')

  access_token = access_token == null ? '' : access_token
  name = name == null ? '' : name
  crypto_currency = crypto_currency == null ? 'OSC' : crypto_currency
  currency_to_currency = currency_to_currency == null ? 'OSC_FFC' : currency_to_currency
  store.commit(SET_USER, {
    name: name,
    access_token: access_token,
    has_payment_password: has_payment_password === null ? true : (has_payment_password === true || has_payment_password === 'true' ? true : false)
  })
  store.commit(SET_CRYPTO_CURRENCY, crypto_currency)
  store.commit(CURRENCY_TO_CURRENCY, currency_to_currency)
  if(referral_code != null){
    store.commit(SET_INVITE_REFERRAL_CODE,referral_code)
  }

  /**
   * 其他页面退出重新登录后触发
   */
  window.onstorage =  () => {
    let access_token = storage.get('at')
    let name = storage.get('name')
    let has_payment_password = storage.get('hpp')
    let referral_code = storage.get('rf')
    access_token = access_token == null ? '' : access_token
    name = name == null ? '' : name
    store.commit(SET_USER, {
      name: name,
      access_token: access_token,
      has_payment_password: has_payment_password === null ? true : (has_payment_password === true || has_payment_password === 'true' ? true : false)
    })
    if(referral_code != null){
      store.commit(SET_INVITE_REFERRAL_CODE,referral_code)
    }
  }
}

user.checkName = function (name) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('name', name)
    axios.post(API_BASE_URL + USER_CHECK_NAME, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.mobileSignUp = function (countryCode, mobile, name, code, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('country_code', countryCode)
    params.append('mobile', mobile)
    params.append('name', name)
    params.append('one_time_code', code)
    params.append('password', password)
    params.append('referral_code', store.state.user.invite_referral_code)
    axios.post(API_BASE_URL + USER_MOBILE_SIGN_UP, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        storage.set('name', name)
        store.commit(SET_USER_NAME,name)
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.mobileSignUpCode = function (mobile, countryCode, captcha) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('mobile', mobile)
    params.append('country_code', countryCode)
    params.append('image_code', captcha)
    axios.post(API_BASE_URL + USER_MOBILE_SIGN_UP_CODE, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.emailSignUpCode = function (email, captcha) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('email', email)
    params.append('image_code', captcha)
    axios.post(API_BASE_URL + USER_EMAIL_SIGN_UP_CODE, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.emailSignUp = function (email, name, code, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('email', email)
    params.append('name', name)
    params.append('one_time_code', code)
    params.append('password', password)
    params.append('referral_code', store.state.user.invite_referral_code)
    axios.post(API_BASE_URL + USER_EMAIL_SIGN_UP, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        storage.set('name', name)
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.signIn = function (account, password, captcha, one_time_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('account', account)
    params.append('password', password)
    params.append('image_code', captcha)
    params.append('one_time_code', one_time_code)
    axios.post(API_BASE_URL + USER_SIGN_IN, params).then((response) => {
      if (parseInt(response.data.code) === 0) {
        let access_token = response.data.data.access_token
        let name = response.data.data.user.name
        let has_payment_password = response.data.data.user.has_payment_password
        storage.set('at', access_token)
        storage.set('name', name)
        storage.set('hpp', has_payment_password)
        store.commit(SET_USER, {
          name: name,
          access_token: access_token,
          has_payment_password: has_payment_password === true || has_payment_password === 'true' ? true : false
        })
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.signOut = function (account, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_SIGN_OUT, params, config).then((response) => {
      storage.set('at', '')
      storage.set('hpp', '')
      store.commit(CLEAN_USER)
      resolve(response.data)
    }).catch((error) => {
      storage.set('at', '')
      storage.set('hpp', '')
      store.commit(CLEAN_USER)
      reject(error.response.data)
    })
  })
}



user.getInfo = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }

    axios.post(API_BASE_URL + USER_INFO, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getSecurity = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_SECURITY, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.setPaymentPassword = function (pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('password', pwd)
    params.append('confirm_password', repeat_pwd)
    axios.post(API_BASE_URL + USER_SET_PAYMENT_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
        store.commit(SET_PAYMENT_PASSWORD_STATUS, {
          has_payment_password: true
        })
        storage.set('hpp', true)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.modifyPaymentPassword = function (old_pwd,new_pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('password', new_pwd)
    params.append('confirm_password', repeat_pwd)
    params.append('old_password', old_pwd)
    axios.post(API_BASE_URL + USER_MODIFY_PAYMENT_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.modifyPassword = function (old_pwd,new_pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('password', new_pwd)
    params.append('confirm_password', repeat_pwd)
    params.append('old_password', old_pwd)
    axios.post(API_BASE_URL + USER_MODIFY_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}



user.bindEmailCode = function (email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('email', email)
    axios.post(API_BASE_URL + USER_BIND_EMAIL_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.bindEmail = function (email, email_one_time_code, mobile_one_time_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('email', email)
    params.append('mobile_one_time_code', mobile_one_time_code)
    params.append('email_one_time_code', email_one_time_code)
    axios.post(API_BASE_URL + USER_BIND_EMAIL, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}



user.bindMobileCode = function (mobile, country_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('mobile', mobile)
    params.append('country_code', country_code)
    axios.post(API_BASE_URL + USER_BIND_MOBILE_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.bindMobile = function (mobile, mobile_one_time_code ,country_code, email_one_time_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('mobile', mobile)
    params.append('country_code', country_code)
    params.append('mobile_one_time_code', mobile_one_time_code)
    params.append('email_one_time_code', email_one_time_code)
    axios.post(API_BASE_URL + USER_BIND_MOBILE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getGoogleAuthKey = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_GOOGLE_AUTH_KEY, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.bindGoogleAuth = function (secret, totp_password, one_time_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('secret', secret)
    params.append('totp_password', totp_password)
    params.append('validate_payment', true)
    params.append('validate_sign_in', false)
    params.append('validate_withdrawal', true)
    params.append('one_time_code', one_time_code)
    axios.post(API_BASE_URL + USER_BIND_GOOGLE_AUTH, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.unbindGoogleAuth = function (totp_password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('totp_password', totp_password)
    axios.post(API_BASE_URL + USER_UNBIND_GOOGLE_AUTH, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getMobileResetCode = function (mobile, country_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('mobile', mobile)
    params.append('country_code', country_code)
    axios.post(API_BASE_URL + USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.mobileResetPwd = function (country_code, mobile, one_time_code, password, confirm_password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('mobile', mobile)
    params.append('country_code', country_code)
    params.append('one_time_code', one_time_code)
    params.append('password', password)
    params.append('confirm_password', confirm_password)
    axios.post(API_BASE_URL + USER_MOBILE_RESET_SIGN_IN_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getEmailResetCode = function (email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('email', email)
    axios.post(API_BASE_URL + USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.emailResetPwd = function (email, one_time_code, password, confirm_password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('email', email)
    params.append('one_time_code', one_time_code)
    params.append('password', password)
    params.append('confirm_password', confirm_password)
    axios.post(API_BASE_URL + USER_EMAIL_RESET_SIGN_IN_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getEmailResetPaymentPwdCode = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.emailResetPaymentPwd = function (one_time_code, password, confirm_password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('one_time_code', one_time_code)
    params.append('password', password)
    params.append('confirm_password', confirm_password)
    axios.post(API_BASE_URL + USER_EMAIL_RESET_PAYMENT_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.getMobileResetPaymentPwdCode = function (email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.mobileResetPaymentPwd = function (one_time_code, password, confirm_password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('one_time_code', one_time_code)
    params.append('password', password)
    params.append('confirm_password', confirm_password)
    axios.post(API_BASE_URL + USER_MOBILE_RESET_PAYMENT_PASSWORD, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getInviteRewardSummary = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_INVITE_REWARD_SUMMARY, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.getInviteRewardDetail = function (offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('offset', offset)
    params.append('limit', limit)
    axios.post(API_BASE_URL + USER_INVITE_REWARD_DETAIL, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.getBindGoogleCode = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_BIND_GOOGLE_AUTH_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.getUserBindEmailMobileCode = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_BIND_EMAIL_MOBILE_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.getUserBindMobileEmailCode = function () {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(API_BASE_URL + USER_BIND_MOBILE_EMAIL_CODE, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

user.getUploadInfo = function (purpose) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('purpose', purpose)
    axios.post(API_BASE_URL + USER_S3_INFO, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}



user.bindAlipay = function (name, payment_code_url, account, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('name', name)
    params.append('payment_code_url', payment_code_url)
    params.append('account', account)
    params.append('password', password)
    axios.post(API_BASE_URL + USER_PAYMENT_BIND_ALIPAY, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.bindWx = function (name, payment_code_url, account, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('name', name)
    params.append('payment_code_url', payment_code_url)
    params.append('account', account)
    params.append('password', password)
    axios.post(API_BASE_URL + USER_PAYMENT_BIND_WECHAT, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}


user.bindBank = function (bank_code, password, card_number, branch_name, name) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('bank_code', bank_code)
    params.append('password', password)
    params.append('card_number', card_number)
    params.append('branch_name', branch_name)
    params.append('name', name)
    axios.post(API_BASE_URL + USER_PAYMENT_BIND_BANK, params ,config).then((response) => {
      if (parseInt(response.data.code) === 0) {
        resolve(response.data)
      }else{
        notice(response.data)
        reject(response.data)
      }
    }).catch((error) => {
      if(typeof error.response.data != 'undefined' ){
        notice(error.response.data)
      }
      reject(error.response.data)
    })
  })
}

export default user
