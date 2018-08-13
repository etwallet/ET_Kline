// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import qs from "qs";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Radio,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Select,
  Switch,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  Popover,
  TableColumn,
  Form,
  FormItem,
  Slider,
  Alert,
  Row,
  Col,
  Loading,
  MessageBox,
  Message,
  Tabs,
  TabPane,
  Tag,
  Notification
} from "element-ui";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

import VueLazyload from "vue-lazyload";

import locales from "./assets/locales";
import store from "./store/index";
import storage from "./models/storage";
import user from "./models/user";

import "normalize.css";
import "./assets/iconfont/iconfont.css";
import "element-ui/lib/theme-default/index.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App";
import router from "./utils/router";

Vue.config.productionTip = true;

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/static/img/img_default.gif",
  loading: "/static/img/img_default.gif",
  attempt: 1
});

import echarts from "echarts";

Vue.prototype.$echarts = echarts;
/* element ui */
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Popover);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Loading);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);

Vue.component(CollapseTransition.name, CollapseTransition);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

/* top process */
NProgress.configure({
  easing: "ease",
  speed: 1000,
  showSpinner: false,
  trickleSpeed: 500
});

/* i18n config */

let lang = "zh_cn";
// if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
  lang = storage.get("lang");
}
const i18n = new VueI18n({
  locale: lang,
  messages: locales
});

Vue.prototype.$locale = {
  change(language) {
    i18n.locale = language;
  },
  current() {
    return i18n.locale;
  }
};

/* init */
user.init();

/* eslint-disable no-new */
window.vm = new Vue({
  el: "#app",
  i18n,
  router,
  store,
  template: "<App/>",
  components: { App }
});
