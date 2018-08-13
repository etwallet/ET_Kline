// 测试环境配置
export const BASE_URL =
  document.location.protocol + "//" + document.location.host;
// export const API_BASE_URL ="http://gateway.eostoken.im/gate"
export const API_BASE_URL =
  document.location.protocol + "//" + document.location.host + "/api";

export const MISC_BASE_URL =
  document.location.protocol + "//misc.firefoxotc.com";

// user
export const USER_CHECK_NAME = "/check_name";
export const USER_MOBILE_SIGN_UP = "/mobile_sign_up";
export const USER_MOBILE_SIGN_UP_CODE = "/mobile_sign_up_code";
export const USER_EMAIL_SIGN_UP_CODE = "/email_sign_up_code";
export const USER_EMAIL_SIGN_UP = "/email_sign_up";
export const USER_SIGN_IN = "/sign_in";
export const USER_SIGN_OUT = "/user/sign_out";

export const USER_INVITE_REWARD_SUMMARY = "/invite/reward/summary";
export const USER_INVITE_REWARD_DETAIL = "/invite/reward/detail";

export const USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE =
  "/mobile_reset_sign_in_password_code";
export const USER_MOBILE_RESET_SIGN_IN_PASSWORD =
  "/mobile_reset_sign_in_password";
export const USER_EMAIL_RESET_SIGN_IN_PASSWORD =
  "/email_reset_sign_in_password";
export const USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE =
  "/email_reset_sign_in_password_code";

export const USER_INFO = "/user/profile";
export const USER_SECURITY = "/user/profile";
export const USER_SET_PAYMENT_PASSWORD = "/set_payment_password";
export const USER_MODIFY_PAYMENT_PASSWORD = "/modify_payment_password";
export const USER_MODIFY_PASSWORD = "/modify_sign_in_password";
export const USER_BIND_EMAIL_CODE = "/bind_email_code";
export const USER_BIND_EMAIL = "/bind_email";
export const USER_BIND_MOBILE_CODE = "/bind_mobile_code";
export const USER_BIND_MOBILE = "/bind_mobile";
export const USER_GOOGLE_AUTH_KEY = "/google_auth_key";
export const USER_BIND_GOOGLE_AUTH = "/bind_google_auth";
export const USER_UNBIND_GOOGLE_AUTH = "/unbind_google_auth";

export const USER_MOBILE_RESET_PAYMENT_PASSWORD =
  "/mobile_reset_payment_password";
export const USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE =
  "/mobile_reset_payment_password_code";
export const USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE =
  "/email_reset_payment_password_code";
export const USER_EMAIL_RESET_PAYMENT_PASSWORD =
  "/email_reset_payment_password";

export const USER_BIND_GOOGLE_AUTH_CODE = "/bind_google_auth_code";
export const USER_BIND_MOBILE_EMAIL_CODE = "/bind_mobile_email_code";
export const USER_BIND_EMAIL_MOBILE_CODE = "/bind_email_mobile_code";

export const USER_S3_INFO = "/aws/upload_file";
export const USER_PAYMENT_BIND_ALIPAY = "/bind_alipay";
export const USER_PAYMENT_BIND_WECHAT = "/bind_wechat_pay";
export const USER_PAYMENT_BIND_BANK = "/bind_bankcard";

//trade
export const TRADE_MARKET_LIST = "/market/list";
export const TRADE_MARKET_PUBLISH = "/market/publish";
export const TRADE_MARKET_EDIT = "/market/edit";
export const TRADE_MARKET_PRE_ORDER = "/market/pre_order";
export const TRADE_MARKET_PLACE_ORDER = "/market/place_order";
export const TRADE_MARKET_PRUCE = "/market/price";
export const TRADE_MARKET_PUBLISH_RESTRICTION = "/market/publish_restriction";

//market
export const MARKET_MINE = "/market/mine";
export const MARKET_UNPUBLISH = "/market/unpublish";
export const MARKET_REPUBLISH = "/market/republish";
export const MARKET_DELETE = "/market/delete";
export const MARKET_GET = "/market/get";

//order
export const ORDER_MINE = "/order/mine";
export const ORDER_PAIN = "/order/paid";
export const ORDER_CANCEL = "/order/cancel";
export const ORDER_GET = "/order/get";
export const ORDER_RELEASE = "/order/release";
export const ORDER_DISPUTE = "/order/dispute";
export const ORDER_TAKE = "/order/take";

//wallet
export const WALLET_BALANCE = "/wallet/balance";
export const WALLET_MY_DEPOSIT = "/wallet/my_deposit";
export const WALLET_BILL = "/wallet/detail";
export const WALLET_GET_ADDRESS = "/wallet/my_address";
export const WALLET_NEW_ADDRESS = "/wallet/new_address";
export const WALLET_MY_WITHDRAWAL = "/wallet/my_withdrawal";
export const WALLET_MY_WITHDRAW = "/wallet/withdraw";
export const WALLET_MY_WITHDRAW_RESTRICTION = "/wallet/withdraw_restriction";
export const WALLET_MY_WITHDRAW_WITHDRAW_CODE = "/wallet/withdraw_code";
export const WALLET_OSC = "/wallet/osc";

//activity
export const ACTIVITY_TOP_DEPOSIT = "/activity/top/deposit";
export const ACTIVITY_TOP_INVITE = "/activity/top/invite";

export const ACTIVITY_GET_SBTC = "/activity/get_sbtc";

//captcha
export const CAPTCHA_SIGNIN = API_BASE_URL + "/image/verify_code/signin";
export const CAPTCHA_SIGNUP = API_BASE_URL + "/image/verify_code/signup";

//data
export const DATA_NOTICE = "/static/data/notice.json?t=20171122";

//exchage
export const EXCHANGE_KLINE = "/exchange/kline";
export const EXCHANGE_TRADES = "/exchange/trades";
export const EXCHANGE_TICKER = "/exchange/ticker";
export const EXCHANGE_DEPTH = "/exchange/depth";

export const EXCHANGE_LIMIT_ORDER = "/exchange/limit_order";
export const EXCHANGE_MARKET_ORDER = "/exchange/market_order";
export const EXCHANGE_CANCEL_ORDER = "/exchange/cancel_order";
export const EXCHANGE_CANCEL_ALL_ORDER = "/exchange/cancel_all_order";
export const EXCHANGE_MY_ORDER = "/exchange/my_order";

export const EXCHANGE_TICKER_LIST = "/exchange/ticker_list";

export const AGENT_LOCK = API_BASE_URL + "/agent/lock";
export const AGENT_UNLOCK = API_BASE_URL + "/agent/unlock";
export const AGENT_DEPOSIT = API_BASE_URL + "/agent/deposit";
export const AGENT_CANCEL_DEPOSIT = API_BASE_URL + "/agent/cancel_deposit/";
export const AGENT_SUCCEED_DEPOSIT = API_BASE_URL + "/agent/succeed_deposit/";
export const AGENT_WITHDRAW = API_BASE_URL + "/agent/withdraw";
export const AGENT_SUCCEED_WITHDRAW = API_BASE_URL + "/agent/succeed_withdraw/";
export const AGENT = API_BASE_URL + "/agent";
export const AGENT_MINE_TRANSFER = API_BASE_URL + "/agent/mine_transfer";
export const AGENT_AGENT_TRANSFER = API_BASE_URL + "/agent/agent_transfer";

export const WALLET_XDAG_BIND_ADDRESS =
  API_BASE_URL + "/wallet/xdag/bind_address";

export const NOTICE_SUBMIT = API_BASE_URL + "/notice/submit";

export const NOTICE_CONTENT = API_BASE_URL + "/notice/content";
export const NOTICE_LIST = API_BASE_URL + "/notice/list";

export const FFT_SHARES_SUMMARY = API_BASE_URL + "/fft_shares/summary";
export const FFT_SHARES_GET = API_BASE_URL + "/fft_shares/get";

/**  eos api */
export const ETEXCHANGEPRICE_LIST = API_BASE_URL + "/etExchangePrice/list";
export const RAMPRICEINFO = API_BASE_URL + "/ramprice/ramPriceInfo";
