import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  TRADE_MARKET_LIST,
  TRADE_MARKET_PUBLISH,
  TRADE_MARKET_PRE_ORDER,
  TRADE_MARKET_PLACE_ORDER,
  TRADE_MARKET_EDIT,
  TRADE_MARKET_PUBLISH_RESTRICTION,
  TRADE_MARKET_PRUCE
} from "./url.js";

import { SET_USER } from "../store/mutation-types";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let trade = {};

trade.adList = function(
  crypto_currency,
  trade_currency,
  is_buy,
  offset,
  limit
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    params.append("is_buy", is_buy);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(API_BASE_URL + TRADE_MARKET_LIST, params)
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

trade.publish = function(
  crypto_currency,
  trade_currency,
  is_buy,
  is_market_price,
  price,
  margin,
  min_qty,
  max_qty,
  limit_qty,
  alipay_on,
  bankcard_on,
  wechat_pay_on,
  auto_take,
  ffc_on
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    params.append("is_buy", is_buy);
    params.append("is_market_price", is_market_price);
    params.append("min_qty", min_qty);
    params.append("max_qty", max_qty);
    params.append("limit_qty", limit_qty);
    params.append("price", price);
    params.append("margin", margin);
    params.append("credit_threshold", "90");
    params.append("alipay_on", alipay_on);
    params.append("bankcard_on", bankcard_on);
    params.append("wechat_pay_on", wechat_pay_on);
    params.append("ffc_on", ffc_on);
    axios
      .post(API_BASE_URL + TRADE_MARKET_PUBLISH, params, config)
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

trade.preOrder = function(id, crypto_currency) {
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
      .post(API_BASE_URL + TRADE_MARKET_PRE_ORDER, params, config)
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

trade.placeOrder = function(id, crypto_currency, qty, amount, message) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    params.append("qty", qty);
    params.append("amount", amount);
    params.append("message", message);
    axios
      .post(API_BASE_URL + TRADE_MARKET_PLACE_ORDER, params, config)
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

trade.getPublishRestriction = function(crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + TRADE_MARKET_PUBLISH_RESTRICTION, params, config)
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

trade.getMarketPrice = function(crypto_currency, trade_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    axios
      .post(API_BASE_URL + TRADE_MARKET_PRUCE, params, config)
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

export default trade;
