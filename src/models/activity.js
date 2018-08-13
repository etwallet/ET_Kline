import axios from 'axios'
import store from '../store'
import notice from '../utils/notice'
import {API_BASE_URL, ACTIVITY_TOP_DEPOSIT, ACTIVITY_TOP_INVITE, ACTIVITY_GET_SBTC} from './url.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let activity = {}

activity.topDeposit = function (offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {}
    if(store.state.user.access_token != ''){
      config = {
        headers: {
          Authorization: 'Bearer ' + store.state.user.access_token
        }
      }
    }
    params.append('offset', offset)
    params.append('limit', limit)

    axios.post(API_BASE_URL + ACTIVITY_TOP_DEPOSIT, params, config).then((response) => {
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

activity.topInvite = function (offset, limit ) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {}
    if(store.state.user.access_token != ''){
      config = {
        headers: {
          Authorization: 'Bearer ' + store.state.user.access_token
        }
      }
    }
    params.append('offset', offset)
    params.append('limit', limit)

    axios.post(API_BASE_URL + ACTIVITY_TOP_INVITE, params, config).then((response) => {
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


activity.getSbtc = function (qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {}
    if(store.state.user.access_token != ''){
      config = {
        headers: {
          Authorization: 'Bearer ' + store.state.user.access_token
        }
      }
    }
    params.append('qty', qty)
    axios.post(API_BASE_URL + ACTIVITY_GET_SBTC, params, config).then((response) => {
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

export default activity
