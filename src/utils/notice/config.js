export const TYPE_MESSAGE_BOX = "message-box";
export const TYPE_MESSAGE = "message";
export const TYPE_NOTIFICATION = "notification";
export const TYPE_NONE = "";

export const CODE_CONFIG = {
  0: { label: "OK", action: "nothing", type: TYPE_NOTIFICATION },
  1: { label: "UNKNOWN_ERROR", action: "nothing", type: TYPE_NONE },
  2: { label: "PARAMETER_ERROR", action: "nothing", type: TYPE_NONE },
  1001: {
    label: "EMAIL_ALREADY_SIGNED_UP",
    action: "nothing",
    type: TYPE_NONE
  },
  1002: {
    label: "MOBILE_ALREADY_SIGNED_UP",
    action: "nothing",
    type: TYPE_NONE
  },
  1003: {
    label: "ACCOUNT_OR_PASSWORD_ERROR",
    action: "nothing",
    type: TYPE_NONE
  },
  1004: { label: "AUTHENTICATE_FAIL", action: "jumpSignIn", type: TYPE_NONE },
  1005: { label: "AUTHORIZE_FAIL", action: "nothing", type: TYPE_NOTIFICATION },
  1006: {
    label: "ONE_TIME_CODE_NOT_MATCH",
    action: "nothing",
    type: TYPE_NONE
  },
  1007: {
    label: "MOBILE_NOT_SIGNED_UP",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1008: {
    label: "EMAIL_NOT_SIGNED_UP",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1009: { label: "USER_NOT_EXIST", action: "nothing", type: TYPE_NOTIFICATION },
  1010: {
    label: "PASSWORD_ALREADY_SET",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1011: { label: "MOBILE_ALREADY_BOUND", action: "nothing", type: TYPE_NONE },
  1012: { label: "EMAIL_ALREADY_BOUND", action: "nothing", type: TYPE_NONE },
  1013: {
    label: "MOBILE_NOT_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1014: {
    label: "EMAIL_NOT_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1015: {
    label: "INCONSISTENT_MOBILE",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1016: {
    label: "INCONSISTENT_EMAIL",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1017: {
    label: "OLD_ONE_TIME_CODE_NOT_MATCH",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1018: {
    label: "PAYMENT_PASSWORD_NOT_SET",
    action: "jumpPaymentPassword",
    type: TYPE_NOTIFICATION
  },
  1019: {
    label: "WITHDRAW_CODE_REQUIRED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1020: {
    label: "GOOGLE_AUTH_ALREADY_ADDED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1021: {
    label: "TOTP_PASSWORD_NOT_MATCH",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1022: { label: "NAME_ALREADY_SIGNED_UP", action: "nothing", type: TYPE_NONE },
  1023: { label: "PASSWORD_NOT_MATCH", action: "nothing", type: TYPE_NONE },
  1024: {
    label: "ACCOUNT_ABNORMAL",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1025: {
    label: "BANKCARD_ALREADY_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1026: {
    label: "ALIPAY_ALREADY_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1027: {
    label: "WECHAT_PAY_ALREADY_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1028: {
    label: "BANKCARD_NOT_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1029: {
    label: "ALIPAY_NOT_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1030: {
    label: "WECHAT_PAY_NOT_BOUND",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1031: {
    label: "PAYMENT_METHODS_NONE",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1032: {
    label: "BANKCARD_PAY_NEED_REAL_NAME_AUTHENTICATED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1101: { label: "ADDRESS_INVALID", action: "nothing", type: TYPE_NONE },
  1104: {
    label: "INSUFFICIENT_BALANCE",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  110401: { label: "BALANCE_LESS", action: "nothing", type: TYPE_NOTIFICATION },
  1105: {
    label: "TRANSFER_NOT_EXIST",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1106: {
    label: "TRANSFER_REJECTED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1107: {
    label: "ADDRESS_COUNT_LIMIT_EXCEEDED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1108: {
    label: "WITHDRAW_ADDRESS_SELF",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1201: {
    label: "AD_ALLOWED_LIMIT",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1202: { label: "AD_NOT_EXIST", action: "jumpTrade", type: TYPE_NOTIFICATION },
  1203: {
    label: "AD_ALREADY_FORBIDDEN",
    action: "jumpTrade",
    type: TYPE_NOTIFICATION
  },
  1204: {
    label: "AD_NOT_ACTIVE",
    action: "jumpTrade",
    type: TYPE_NOTIFICATION
  },
  1205: {
    label: "TRADE_PRICE_NOT_MATCH",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1206: {
    label: "TRADE_AMOUNT_LIMIT",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1207: {
    label: "TRADE_BY_SELF",
    action: "jumpTrade",
    type: TYPE_NOTIFICATION
  },
  1208: {
    label: "TRADE_TAKE_LIMIT",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1209: {
    label: "TRADE_NOT_EXIST",
    action: "jumpTrade",
    type: TYPE_NOTIFICATION
  },
  1210: {
    label: "TRADE_STAGE_NOT_ALLOWED",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1211: {
    label: "TRADE_CREDIT_NOT_ENOUGH",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1212: {
    label: "TRADE_BUY_LIMIT",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1213: {
    label: "TRADE_NOT_PROCESSED_TOO_MANY",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1214: {
    label: "AD_LIMIT_QTY_TOO_LOW",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1215: {
    label: "TRADE_TAKE_FORBID_TODAY",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1301: {
    label: "PASSWORD_RESET_CONTACT_CUSTOMER",
    action: "nothing",
    type: TYPE_NOTIFICATION
  },
  1401: { label: "SIGN_IN_IP_CHANGED", action: "nothing", type: TYPE_NONE },
  1402: {
    label: "SIGN_IN_PWD_RETRIED_FREQ",
    action: "nothing",
    type: TYPE_NONE
  },
  1403: {
    label: "SIGN_IN_NEED_GOOGLE_AUTH",
    action: "nothing",
    type: TYPE_NONE
  },
  1700: {
    label: "AGENT_INSUFFICIENT_FUND",
    action: "nothing",
    type: TYPE_NONE
  },
  1701: { label: "AGENT_UNUSABLE", action: "nothing", type: TYPE_NONE },
  1702: {
    label: "AGENT_TRANSFER_NOT_EXIST",
    action: "nothing",
    type: TYPE_NONE
  },
  1703: {
    label: "AGENT_TRANSFER_DEPOSIT_EXIST",
    action: "nothing",
    type: TYPE_NONE
  },
  1704: {
    label: "AGENT_TRANSFER_WITHDRAW_EXIST",
    action: "nothing",
    type: TYPE_NONE
  },
  1110: { label: "FFT_INSUFFICIENT_200", action: "nothing", type: TYPE_NONE },
  1111: {
    label: "FFT_SHARES_ONE_TIME_ONEDAY",
    action: "nothing",
    type: TYPE_NONE
  },
  1112: { label: "FFT_SHARES_NOT_OPEN", action: "nothing", type: TYPE_NONE },
  1501: { label: "ORDER_INVALID", action: "nothing", type: TYPE_NOTIFICATION },
  1216: {
    label: "FFC_INSUFFICIENT",
    action: "nothing",
    type: TYPE_NOTIFICATION
  }
};
