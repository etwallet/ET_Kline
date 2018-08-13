import storage from '../../models/storage'
import { SET_USER, CLEAN_USER, SET_INVITE_REFERRAL_CODE, SET_PAYMENT_PASSWORD_STATUS, SET_USER_NAME, SET_CRYPTO_CURRENCY, CURRENCY_TO_CURRENCY } from '../mutation-types'

export default {
  state: {
    name:'',
    access_token:'',
    invite_referral_code: '',
    crypto_currency: 'OSC',
    currency_to_currency: 'OSC_FFC',
    has_payment_password: false
  },
  getters: {
    name: state => {
      return state.name
    },
    access_token: state => {
      return state.access_token
    },
    invite_referral_code: state => {
      return state.invite_referral_code
    }
  },
  mutations: {
    [SET_USER] (state, user) {
      state.name =  user.name
      state.access_token =  user.access_token
      state.has_payment_password =  user.has_payment_password
    },
    [SET_USER_NAME] (state, name) {
      state.name =  name
    },
    [CLEAN_USER] (state) {
      state.name = ''
      state.access_token =  ''
      state.has_payment_password =  ''
    },
    
    [CURRENCY_TO_CURRENCY] (state, currency_to_currency) {
      /**
       * 这种情况不能监控storage回调，否则会死循环
       */
      storage.set('ctc',currency_to_currency)
      state.currency_to_currency =  currency_to_currency
    },

    [SET_CRYPTO_CURRENCY] (state, crypto_currency) {
      /**
       * 这种情况不能监控storage回调，否则会死循环
       */
      storage.set('ccy',crypto_currency)
      state.crypto_currency =  crypto_currency
    },
    [SET_INVITE_REFERRAL_CODE] (state, invite_referral_code) {
      state.invite_referral_code = invite_referral_code
    },
    [SET_PAYMENT_PASSWORD_STATUS] (state, has_payment_password) {
      state.has_payment_password = has_payment_password
    }
  }
}
