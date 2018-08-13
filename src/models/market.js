import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  MARKET_MINE,
  MARKET_UNPUBLISH,
  MARKET_REPUBLISH,
  MARKET_DELETE,
  MARKET_GET,
  TRADE_MARKET_EDIT
} from "./url.js";

import { SET_USER } from "../store/mutation-types";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let market = {};

market.mine = function(crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + MARKET_MINE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

market.get = function(id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    axios
      .post(API_BASE_URL + MARKET_GET, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

market.edit = function(
  id,
  crypto_currency,
  trade_currency,
  is_buy,
  is_market_price,
  price,
  margin,
  min_qty,
  max_qty,
  message,
  agent,
  alipay_on,
  bankcard_on,
  credit_threshold,
  wechat_pay_on,
  auto_take,
  limit_qty,
  ffc_on
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    params.append("is_buy", is_buy);
    params.append("is_market_price", is_market_price);
    params.append("min_qty", min_qty);
    params.append("max_qty", max_qty);
    params.append("message", message);
    params.append("price", price);
    params.append("margin", margin);
    params.append("is_agent", agent);
    params.append("credit_threshold", credit_threshold);
    params.append("alipay_on", alipay_on);
    params.append("bankcard_on", bankcard_on);
    params.append("wechat_pay_on", wechat_pay_on);
    params.append("is_auto_taken", auto_take);
    params.append("limit_qty", limit_qty);
    params.append("ffc_on", ffc_on);
    axios
      .post(API_BASE_URL + TRADE_MARKET_EDIT, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

market.unpublish = function(id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    axios
      .post(API_BASE_URL + MARKET_UNPUBLISH, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

market.republish = function(id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    axios
      .post(API_BASE_URL + MARKET_REPUBLISH, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

market.del = function(id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    axios
      .post(API_BASE_URL + MARKET_DELETE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

export default market;
