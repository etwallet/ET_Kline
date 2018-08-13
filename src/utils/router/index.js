import Vue from "vue";
import Router from "vue-router";
import store from "../../store/index";
import {
  SET_INVITE_REFERRAL_CODE,
  SET_CRYPTO_CURRENCY,
  CURRENCY_TO_CURRENCY
} from "../../store/mutation-types";
import storage from "../../models/storage";

import {} from "../../store/mutation-types";
//不鉴权的页面
const NO_AUTH_PAGES = ["Index"];

const NEED_PAYMENT_PWD_PAGES = [];

const Index = r =>

  require.ensure([], () => r(require("@/pages/index")), "index");

Vue.use(Router);

let router = new Router({
  mode: !!(window.history && history.pushState) ? "history" : "hash",
  routes: [{
      path: "/index",
      name: "Index",
      component: Index,
      alias: "/"
    },


    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
  // if (typeof to.query.referral_code != "undefined") {
  //   store.commit(SET_INVITE_REFERRAL_CODE, to.query.referral_code);
  //   storage.set("rf", to.query.referral_code);
  // }
  // if (
  //   store.state.user.currency_to_currency == "OSC_FFC" ||
  //   store.state.user.currency_to_currency == "DGC_FFC" ||
  //   store.state.user.currency_to_currency == "XDAG_FFC" ||
  //   store.state.user.currency_to_currency == "FFT_FFC" ||
  //   store.state.user.currency_to_currency == "ETH_FFC" ||
  //   store.state.user.currency_to_currency == "CBC_FFC"
  // ) {
  // } else {
  //   store.commit(CURRENCY_TO_CURRENCY, "OSC_FFC");
  // }
  // if (store.state.user.crypto_currency == "FFC") {
  //   store.commit(SET_CRYPTO_CURRENCY, "OSC");
  // }
  //是否需要登录判断
  //login
  // if (NO_AUTH_PAGES.indexOf(to.name) > -1) {
  //   next();
  // } else {
  //   if (store.state.user.access_token.length > 0) {
  //     //是否需要支付密码
  //     if (
  //       NEED_PAYMENT_PWD_PAGES.indexOf(to.name) > -1 &&
  //       !store.state.user.has_payment_password
  //     ) {
  //       if (from.name === "UserSetPaymentPassword") {
  //         nprogress.set(0.6);
  //         nprogress.done();
  //       }
  //       router.push(
  //         "/user/security/set_payment_password?refer=" +
  //           encodeURIComponent(to.path)
  //       );
  //     } else {
  //       next();
  //     }
  //   } else {
  //     if (from.name === "SignIn") {
  //       nprogress.set(0.6);
  //       nprogress.done();
  //     }
  //     router.push("/signin?refer=" + encodeURIComponent(to.path));
  //   }
  // }
});

export default router;
