import axios from 'axios'
import notice from '../utils/notice'
import {BASE_URL, DATA_NOTICE} from './url.js'

let data = {}


data.getNotice = function () {
  return new Promise((resolve, reject) => {
    axios.get(DATA_NOTICE).then((response) => {
        resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default data
