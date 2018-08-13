import axios from "axios";
import axiosCancel from "axios-cancel";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import qs from "qs";
import {
  API_BASE_URL,
  EXCHANGE_KLINE,
  EXCHANGE_TRADES,
  EXCHANGE_TICKER,
  EXCHANGE_DEPTH,
  EXCHANGE_LIMIT_ORDER,
  EXCHANGE_MARKET_ORDER,
  EXCHANGE_CANCEL_ORDER,
  EXCHANGE_CANCEL_ALL_ORDER,
  EXCHANGE_MY_ORDER,
  EXCHANGE_TICKER_LIST,
  ETEXCHANGEPRICE_LIST,
  RAMPRICEINFO
} from "./url.js";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axiosCancel(axios);
let exchange = {};

const cancel_request = ["TRADES", "DEPTH", "TICKER", "MY_TRADING_ORDER"];
exchange.exchange_list = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(ETEXCHANGEPRICE_LIST)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.ramPriceInfo = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(RAMPRICEINFO)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

exchange.exchangePriceInfo = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/etExchangePrice/info/" + code)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.ramPriceNewTradesOrders = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/ramprice/getNewTradeOrders")
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.ramPriceLargeTradesOrders = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/ramprice/getLargeRamRank")
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

exchange.echangePriceInfo = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/etExchangePrice/info/" + code)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.ramPriceBigTradesOrders = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/ramprice/getBigTradeOrders")
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.exchangePriceNewTredeOrder = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/etExchangePrice/getNewTradeOrders/" + code)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.exchangePriceBigTredeOrder = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/etExchangePrice/getBigTradeOrders/" + code)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
exchange.exchangePriceLargeTredeOrder = function(code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = { headers: {} };
    axios
      .get(API_BASE_URL + "/etExchangePrice/getLargeTradeOrders/" + code)
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

exchange.ramPriceNewTradeOrdersByAccountName = function(
  account_name,
  pageCount,
  last_id
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      // headers: { "Content-Type": "application/json;charset=UTF-8" }
    };

    params.append("account_name", account_name);
    params.append("pageCount", pageCount);
    params.append("last_id", last_id);

    axios
      .post(
        API_BASE_URL + "/ramprice/getNewTradeOrdersByAccountName2",
        params,
        config
      )
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

exchange.etExchangePriceNewTradeOrdersByAccountName = function(
  code,
  account_name,
  pageCount,
  last_id
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      // headers: { "Content-Type": "application/json;charset=UTF-8" }
    };

    params.append("account_name", account_name);
    params.append("pageCount", pageCount);
    params.append("last_id", last_id);
    params.append("code", code);

    axios
      .post(
        API_BASE_URL + "/etExchangePrice/getNewTradeOrdersByAccountName2",
        params,
        config
      )
      .then(function(response) {
        var data = response.data;
        if (data.code == 0) {
          resolve(data.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

export default exchange;
