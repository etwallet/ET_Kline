let validate = {}

validate.isEmail = function (email) {
  return /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])*((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(email)
}

/**
 * 电话校验
 * @param phone
 * @param country_code
 * @returns {boolean}
 */
validate.isPhone = function (phone ,country_code) {
  if(country_code === '86'){
    return /^((1[0-9]{2})|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(phone)
  }
  return /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(phone)
}

validate.isPwd = function (pwd) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pwd)
}

validate.isPaymentPwd = function (pwd) {
  return pwd.length >= 6
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pwd)
}

validate.isRePasswordCorrect = function (pwd,re) {
  return pwd === re
}


export default validate