import store from '../../store'
import storage from '../../models/storage'
import {CLEAN_USER} from '../../store/mutation-types'
let action = {
}

action.jumpSignIn = function () {
  window.vm.$router.push('/signin?refer=' + encodeURIComponent(window.location.pathname))
  storage.set('at', '')
  storage.set('hpp', '')
  store.commit(CLEAN_USER)
}

action.jumpTrade = function () {
  window.vm.$router.push('/trade')
}

action.goBack = function () {
  window.vm.$router.go(-1)
}

action.nothing = function () {

}
action.jumpPaymentPassword = function () {
  window.vm.$router.push('/user/security/set_payment_password')
}
export default action