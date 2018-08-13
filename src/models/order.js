import axios from 'axios'
import storage from './storage'
import store from '../store'
import notice from '../utils/notice'
import {API_BASE_URL, ORDER_MINE, ORDER_PAIN, ORDER_CANCEL, ORDER_GET, ORDER_RELEASE, ORDER_DISPUTE, ORDER_TAKE} from './url.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let order = {}

order.list = function (is_trading, offset, limit , crypto_currency = '') {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('is_trading', is_trading)
    params.append('offset', offset)
    params.append('limit', limit)
    params.append('crypto_currency', crypto_currency)

    axios.post(API_BASE_URL + ORDER_MINE, params, config).then((response) => {
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


order.paid = function (id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    axios.post(API_BASE_URL + ORDER_PAIN, params, config).then((response) => {
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

order.cancel = function (id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    axios.post(API_BASE_URL + ORDER_CANCEL, params, config).then((response) => {
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


order.take = function (id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    axios.post(API_BASE_URL + ORDER_TAKE, params, config).then((response) => {
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

order.get = function (id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    axios.post(API_BASE_URL + ORDER_GET, params, config).then((response) => {
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

order.release = function (id, crypto_currency, payment_pwd) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    params.append('password', payment_pwd)
    axios.post(API_BASE_URL + ORDER_RELEASE, params, config).then((response) => {
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

order.dispute = function (id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('crypto_currency', crypto_currency)
    params.append('id', id)
    axios.post(API_BASE_URL + ORDER_DISPUTE, params, config).then((response) => {
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



export default order
