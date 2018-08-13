import axios from 'axios'
import storage from './storage'
import store from '../store'
import notice from '../utils/notice'
import {API_BASE_URL,AGENT_LOCK,AGENT_UNLOCK,AGENT_DEPOSIT,AGENT_CANCEL_DEPOSIT,AGENT_SUCCEED_DEPOSIT,AGENT_SUCCEED_WITHDRAW,AGENT_WITHDRAW,AGENT,AGENT_MINE_TRANSFER,AGENT_AGENT_TRANSFER} from './url.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let agent = {}

agent.agent_lock = function(currency,qty){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('currency', currency)
    params.append('qty', qty)
    axios.post(AGENT_LOCK, params, config).then((response) => {
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

agent.agent_unlock = function(currency,qty){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('currency', currency)
    params.append('qty', qty)
    axios.post(AGENT_UNLOCK, params, config).then((response) => {
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

agent.agent_deposit = function(cny){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('cny', cny)
    axios.post(AGENT_DEPOSIT, params, config).then((response) => {
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

agent.agent_cancel_deposit = function(id){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(AGENT_CANCEL_DEPOSIT+id, params, config).then((response) => {
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

agent.agent_succeed_deposit = function(id,password){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('password', password)
    axios.post(AGENT_SUCCEED_DEPOSIT+id, params, config).then((response) => {
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


agent.agent_succeed_withdraw = function(id,password){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('password', password)
    axios.post(AGENT_SUCCEED_WITHDRAW+id, params, config).then((response) => {
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


agent.agent_withdraw = function(cny){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('cny', cny)
    axios.post(AGENT_WITHDRAW, params, config).then((response) => {
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
// agent.agent_succeed_withdraw = function(id,password){
//   return new Promise((resolve, reject) => {
//     let params = new URLSearchParams()
//     let config = {
//       headers: {
//         Authorization: 'Bearer ' + store.state.user.access_token
//       }
//     }
//     params.append('password', password)
//     axios.post(AGENT_SUCCEED_WITHDRAW+id, params, config).then((response) => {
//       if (parseInt(response.data.code) === 0) {
//         resolve(response.data)
//       }else{
//         notice(response.data)
//         reject(response.data)
//       }
//     }).catch((error) => {
//       if(typeof error.response.data != 'undefined' ){
//         notice(error.response.data)
//       }
//       reject(error.response.data)
//     })
//   })
// }
agent.agent = function(){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    axios.post(AGENT, params, config).then((response) => {
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

agent.agent_mine_transfer = function(type,status,offset,limit){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('type', type)
    params.append('status', status)
    params.append('offset', offset)
    params.append('limit', limit)
    axios.post(AGENT_MINE_TRANSFER, params, config).then((response) => {
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

agent.agent_agent_transfer = function(type,status,offset,limit){
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    let config = {
      headers: {
        Authorization: 'Bearer ' + store.state.user.access_token
      }
    }
    params.append('type', type)
    params.append('status', status)
    params.append('offset', offset)
    params.append('limit', limit)
    axios.post(AGENT_AGENT_TRANSFER, params, config).then((response) => {
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


export default agent
