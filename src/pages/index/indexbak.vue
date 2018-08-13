<template>
  <div class="content-exchange">
       <Top class="home-top"></Top>
    <div >
    
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="exchange-right">
            <div class="market">
                <p>{{$t('Exchange.FireFoxExchangeZone')}}</p>
                 <!-- <el-input :placeholder="$t('Exchange.Serch')" class="input-with-select"  @keydown="search" v-model="keyWord" @focus="search" @blur="search"> 
                  <el-button slot="append" class="search_ico" >
                    <i class="search_btn"></i>
                  </el-button>
                </el-input>  -->

                <div style="position: relative;display:flex;margin-top: 18px;">
                  <input   class="trade_input" @keydown="search" type="text" v-model="keyWord" :placeholder="$t('Exchange.Serch')"  @input="search"> 
                  <i class="search_btn" style="position: absolute;right:12px;top:7px;"></i>
                </div>
                
                <div class="market-choise-zone">
                   <div v-show="isFFTShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='FFT'}" @click="currencyChange('FFT_FFC')">
                     <i class="ico-fft"></i>
                     <div class="market-choise-ft">
                       FFT /<span class="green">&nbsp;FFC</span><br />
                       {{FFT_PRICE}} FFC
                     </div>
                      <div class="market-choise-lv">
                        <span class="green"  v-show="parseFloat(FFT_PRICE)>=parseFloat(fft_open)">+{{FFT_PRICE ,fft_open|fft_filters}}&nbsp;%</span>
                        <span class="red"  v-show="parseFloat(FFT_PRICE)<parseFloat(fft_open)">{{FFT_PRICE ,fft_open|fft_filters}}&nbsp;%</span>
                      </div>
                    </div> 
                   <div v-show="isOSCShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='OSC'}" @click="currencyChange('OSC_FFC')">
                     <i class="ico-osc"></i>
                     <div class="market-choise-ft">
                       OSC /<span class="green">&nbsp;FFC</span><br />
                       {{OSC_PRICE}} FFC
                     </div>
                      <div class="market-choise-lv">
                        <span class="green"  v-show="parseFloat(OSC_PRICE)>=parseFloat(osc_open)">+{{OSC_PRICE ,osc_open|osc_filters}}&nbsp;%</span>
                        <span class="red"  v-show="parseFloat(OSC_PRICE)<parseFloat(osc_open)">{{OSC_PRICE ,osc_open|osc_filters}}&nbsp;%</span>
                      </div>
                    </div>
                   <div v-show="isDGCShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='DGC'}"  @click="currencyChange('DGC_FFC')">
                     <i class="ico-dgc"></i>
                     <div class="market-choise-ft">
                      DGC /<span class="green">&nbsp;FFC</span><br />
                      {{DGC_PRICE}} FFC
                     </div>
                     <div class="market-choise-lv">
                        <span class="green" v-show="parseFloat(DGC_PRICE)>=parseFloat(dgc_open)" >+{{DGC_PRICE ,dgc_open|dgc_filters}}&nbsp;%</span>
                        <span class="red" v-show="parseFloat(DGC_PRICE)<parseFloat(dgc_open)" >{{DGC_PRICE ,dgc_open|dgc_filters}}&nbsp;%</span>
                      </div>
                   </div>
                   <div v-show="isXDAGShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='XDAG'}"  @click="currencyChange('XDAG_FFC')">
                     <i class="ico-xdag"></i>
                     <div class="market-choise-ft">
                      XDAG /<span class="green">&nbsp;FFC</span><br />
                      {{XDAG_PRICE}} FFC
                     </div>
                     <div class="market-choise-lv">
                        <span class="green" v-show="parseFloat(XDAG_PRICE)>=parseFloat(xdag_open)" >+{{XDAG_PRICE ,xdag_open|xdag_filters}}&nbsp;%</span>
                        <span class="red" v-show="parseFloat(XDAG_PRICE)<parseFloat(xdag_open)" >{{XDAG_PRICE ,xdag_open|xdag_filters}}&nbsp;%</span>
                      </div>
                   </div>
                   <div v-show="isCBCShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='CBC'}"  @click="currencyChange('CBC_FFC')">
                     <i class="ico-cbc"></i>
                     <div class="market-choise-ft">
                      CBC /<span class="green">&nbsp;FFC</span><br />
                      {{CBC_PRICE}} FFC
                     </div>
                     <div class="market-choise-lv">
                        <span class="green" v-show="parseFloat(CBC_PRICE)>=parseFloat(cbc_open)" >+{{CBC_PRICE ,cbc_open|cbc_filters}}&nbsp;%</span>
                        <span class="red" v-show="parseFloat(CBC_PRICE)<parseFloat(cbc_open)" >{{CBC_PRICE ,cbc_open|cbc_filters}}&nbsp;%</span>
                      </div>
                   </div>
                   <div v-show="isETHShow" class="trade_choise_name" :class="{trade_choise_name_active:exchange_from=='ETH'}"  @click="currencyChange('ETH_FFC')">
                     <i class="ico-eth"></i>
                     <div class="market-choise-ft">
                      ETH /<span class="green">&nbsp;FFC</span><br />
                      {{ETH_PRICE}} FFC
                     </div>
                     <div class="market-choise-lv">
                        <span class="green" v-show="parseFloat(ETH_PRICE)>=parseFloat(eth_open)" >+{{ETH_PRICE ,eth_open|eth_filters}}&nbsp;%</span>
                        <span class="red" v-show="parseFloat(ETH_PRICE)<parseFloat(eth_open)" >{{ETH_PRICE ,eth_open|eth_filters}}&nbsp;%</span>
                      </div>
                   </div>
                </div>
            </div>
             <div class="news_zone" > <!--v-for="(item,index) in  notices" :key="index"-->
             <p>{{$t('Exchange.FireFoxNotice')}}</p>
               <div  v-for="(item,index) in  notices" :key="index">
                  
               <a class="news-list"  @click="notice(item.id)" target="_blank">
                 {{item.title}}
                  <p class="time">{{getHumanDate(item.created)}}</p>
                </a>
               </div>
                <!-- <p>{{$t('Exchange.FireFoxNotice')}}</p>
                <a class="news-list" href="/zh_cn/article/20180511.html" target="_blank">
                  {{$t('Exchange.FireFoxNotice1')}}
                  <p class="time">2018-05-11</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180504.html" target="_blank">
                   {{$t('Exchange.FireFoxNotice2')}}
                  <p class="time">2018-05-04</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180326.html" target="_blank">
                  {{$t('Exchange.FireFoxNotice3')}}
                  <p class="time">2018-03-26</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180314.html" target="_blank">
                 {{$t('Exchange.FireFoxNotice4')}}
                  <p class="time">2018-03-14</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180309.html" target="_blank">
                   {{$t('Exchange.FireFoxNotice5')}}
                  <p class="time">2018-03-09</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180131.html" target="_blank">
                  {{$t('Exchange.FireFoxNotice6')}}
                  <p class="time">2018-01-31</p>
                </a>
                <a class="news-list" href="/zh_cn/article/20180118.html" target="_blank">
                  {{$t('Exchange.FireFoxNotice7')}}
                  <p class="time">2018-01-18</p>
                </a> -->
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <div class="kline-top-zone">
              <div class="kline-top-data">
                <span class="title">{{exchange_from}}/FFC</span>
                <span class="data-ft" v-show="exchange_from=='OSC'"> {{$t('Exchange.TickerLast')}}  {{OSC_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='DGC'" >{{$t('Exchange.TickerLast')}} {{DGC_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='XDAG'" >{{$t('Exchange.TickerLast')}} {{XDAG_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='FFT'" >{{$t('Exchange.TickerLast')}} {{FFT_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='CBC'" >{{$t('Exchange.TickerLast')}} {{CBC_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='ETH'" >{{$t('Exchange.TickerLast')}} {{ETH_PRICE}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='OSC'">{{$t('Exchange.TickerLow')}} <span class="green">{{osc_low}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='DGC'">{{$t('Exchange.TickerLow')}}  <span class="green">{{dgc_low}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='XDAG'">{{$t('Exchange.TickerLow')}}  <span class="green">{{xdag_low}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='FFT'">{{$t('Exchange.TickerLow')}}  <span class="green">{{fft_low}}</span> FFC</span>
                 <span class="data-ft" v-show="exchange_from=='CBC'">{{$t('Exchange.TickerLow')}}  <span class="green">{{cbc_low}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='ETH'">{{$t('Exchange.TickerLow')}}  <span class="green">{{eth_low}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='OSC'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{osc_high}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='DGC'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{dgc_high}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='XDAG'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{xdag_high}}</span> FFC</span>
                 <span class="data-ft" v-show="exchange_from=='FFT'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{fft_high}}</span> FFC</span>
                  <span class="data-ft" v-show="exchange_from=='CBC'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{cbc_high}}</span> FFC</span>
                 <span class="data-ft" v-show="exchange_from=='ETH'">{{$t('Exchange.TickerHigh')}}  <span class="red">{{eth_high}}</span> FFC</span>
                <span class="data-ft" v-show="exchange_from=='OSC'">{{$t('Exchange.TickerVolume')}}  {{osc_volume}} OSC</span>
                <span class="data-ft" v-show="exchange_from=='DGC'">{{$t('Exchange.TickerVolume')}}  {{dgc_volume}} DGC</span>
                <span class="data-ft" v-show="exchange_from=='XDAG'">{{$t('Exchange.TickerVolume')}}  {{xdag_volume}} XDAG</span>
                <span class="data-ft" v-show="exchange_from=='FFT'">{{$t('Exchange.TickerVolume')}}  {{fft_volume}} FFT</span>
                <span class="data-ft" v-show="exchange_from=='CBC'">{{$t('Exchange.TickerVolume')}}  {{cbc_volume}} CBC</span>
                <span class="data-ft" v-show="exchange_from=='ETH'">{{$t('Exchange.TickerVolume')}}  {{eth_volume}} ETH</span>
                <span class="data-ft" v-show="exchange_from=='OSC'">{{$t('Exchange.TickerAmount')}}  {{osc_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='DGC'">{{$t('Exchange.TickerAmount')}}  {{dgc_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='XDAG'">{{$t('Exchange.TickerAmount')}}  {{xdag_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='FFT'">{{$t('Exchange.TickerAmount')}}  {{fft_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='CBC'">{{$t('Exchange.TickerAmount')}}  {{cbc_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='ETH'">{{$t('Exchange.TickerAmount')}}  {{eth_amount}} FFC</span>
                <span class="data-ft" v-show="exchange_from=='OSC' && OSC_PRICE>=osc_open" >{{$t('Exchange.ZhangDie')}}  <span class="green">+{{OSC_PRICE ,osc_open|osc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='OSC' && OSC_PRICE<osc_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{OSC_PRICE ,osc_open|osc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='DGC' && DGC_PRICE>=dgc_open" >{{$t('Exchange.ZhangDie')}} <span class="green">+{{DGC_PRICE ,dgc_open|dgc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='DGC' && DGC_PRICE<dgc_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{DGC_PRICE ,dgc_open|dgc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='XDAG' && XDAG_PRICE>=xdag_open" >{{$t('Exchange.ZhangDie')}} <span class="green">+{{XDAG_PRICE ,xdag_open|xdag_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='XDAG' && XDAG_PRICE<xdag_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{XDAG_PRICE ,xdag_open|xdag_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='FFT' && FFT_PRICE>=fft_open" >{{$t('Exchange.ZhangDie')}} <span class="green">+{{FFT_PRICE ,fft_open|fft_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='FFT' && FFT_PRICE<fft_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{FFT_PRICE ,fft_open|fft_filters}} %</span></span>
                 <span class="data-ft" v-show="exchange_from=='CBC' && CBC_PRICE>=cbc_open" >{{$t('Exchange.ZhangDie')}} <span class="green">+{{CBC_PRICE ,cbc_open|cbc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='CBC' && CBC_PRICE<cbc_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{CBC_PRICE ,cbc_open|cbc_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='ETH' && ETH_PRICE>=eth_open" >{{$t('Exchange.ZhangDie')}} <span class="green">+{{ETH_PRICE ,eth_open|eth_filters}} %</span></span>
                <span class="data-ft" v-show="exchange_from=='ETH' && ETH_PRICE<eth_open" >{{$t('Exchange.ZhangDie')}} <span class="red">{{ETH_PRICE ,eth_open|eth_filters}} %</span></span>
              </div>
              <div class="kline-border">
                  <div id="kline_container" class="kline"></div>
              </div>
            </div>
              <el-row :gutter="10" style="min-width:100%;margin-right:0px;margin-top:10px;display:flex;align-items:stretch;">
                <el-col :span="13" style="">
                   <TradeBox :trade_price="trade_price" :exchange_from="exchange_from" :exchange_to="exchange_to" ref="trade_box" :getBalance="getBalance"></TradeBox>
                </el-col>
                <el-col :span="11" style="padding-right:0px;">
                  <RealtimeBox  v-on:price="getPrice"   :exchange_from="exchange_from" :exchange_to="exchange_to" ref="realtime_box" @set_sell_price="set_sell_price" @set_buy_price="set_buy_price"></RealtimeBox>
                </el-col>
              </el-row>
              <div class="trade_box_zone">
               
              </div>
            </div>
        </el-col>
      </el-row>
    </div>
     <div class="bottom">
    <div class="site_map">
      <div class="site_map_left">
        <a :href="'/'+language+'/about.html'">{{$t('Bottom.SiteMap.ContactUs')}}</a>
        <a :href="'/'+language+'/agreement.html'">{{$t('Bottom.SiteMap.UserAgreement')}}</a>
        <a :href="'/'+language+'/help.html'">{{$t('Bottom.SiteMap.Help')}}</a>
        <a :href="'/'+language+'/rate.html'">{{$t('Bottom.SiteMap.Fee')}}</a>
         <a href="https://m.firefoxotc.com/">{{$t('Bottom.SiteMap.Ph')}}</a>
        <el-select @change="language_change" class="language" v-model="language" placeholder="请选择">
              <el-option
                v-for="item in language_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </div>
      <div class="site_map_left" style="text-align:left"> Copyright 2017 firefoxotc. All Rights Reserved <a href="https://www.icris.cr.gov.hk/csci/" target="_blank">{{$t('Bottom.CP.Company')}}</a></div>
    </div>
  </div>
  </div>
</template>
<script>
import nprogress from "nprogress";
import Top from "../../components/top";

import activity from "../../models/activity";
import storage from "../../models/storage";
import Kline from "../../utils/kline";
import store from "../../store";
import { CURRENCY_TO_CURRENCY } from "../../store/mutation-types";

import SelectMenu from "./select_menu";
import RealtimeBox from "./realtime_box";
import TradeBox from "./trade_box";
import exchange from "../../models/exchange";

import notice1 from "../../models/notice1";
import moment from "../../utils/moment";

import { API_BASE_URL, EXCHANGE_KLINE } from "../../models/url";

export default {
  name: "Exchange",
  components: {
    Top,
    SelectMenu,
    RealtimeBox,
    TradeBox
  },
  data() {
    return {
      exchange_from: "OSC",
      exchange_to: "FFC",
      ticker_timer: null,
      trade_price: "0_0",
      OSC_PRICE: 0,
      DGC_PRICE: 0,
      XDAG_PRICE: 0,
      FFT_PRICE: 0,
      CBC_PRICE: 0,
      ETH_PRICE: 0,
      osc_open: 0,
      dgc_open: 0,
      xdag_open: 0,
      fft_open: 0,
      cbc_open: 0,
      eth_open: 0,
      osc_high: "",
      osc_low: "",
      dgc_high: "",
      dgc_low: "",
      xdag_high: "",
      xdag_low: "",
      fft_high: "",
      fft_low: "",
      cbc_high: "",
      cbc_low: "",
      eth_high: "",
      eth_low: "",
      osc_volume: "",
      dgc_volume: "",
      xdag_volume: "",
      fft_volume: "",
      cbc_volume: "",
      eth_volume: "",
      osc_amount: "",
      dgc_amount: "",
      xdag_amount: "",
      fft_amount: "",
      cbc_amount: "",
      eth_amount: "",

      isFFTShow: true,
      isOSCShow: true,
      isDGCShow: true,
      isXDAGShow: true,
      isCBCShow: true,
      isETHShow: true,

      current_price: "0_0",
      freshTime: new Date().getTime(),
      getBalance: "",
      notices: [],
      language_list: [
        {
          value: "zh_tw",
          label: "繁體中文"
        } /*, {
          value: 'en',
          label: 'English'
        }*/,
        {
          value: "zh_cn",
          label: "简体中文"
        }
      ],
      language: this.$locale.current(),
      keyWord: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  filters: {
    osc_filters(last, osc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == osc_open || osc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(osc_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(osc_open)) /
        parseFloat(osc_open) *
        100
      ).toFixed(2);
      return value;
    },
    dgc_filters(last, dgc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dgc_open || dgc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dgc_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(dgc_open)) /
        parseFloat(dgc_open) *
        100
      ).toFixed(2);
      return value;
    },
    xdag_filters(last, xdag_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == xdag_open || xdag_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(xdag_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(xdag_open)) /
        parseFloat(xdag_open) *
        100
      ).toFixed(2);
      return value;
    },
    fft_filters(last, fft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == fft_open || fft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(fft_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(fft_open)) /
        parseFloat(fft_open) *
        100
      ).toFixed(2);
      return value;
    },
    cbc_filters(last, cbc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == cbc_open || cbc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(cbc_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(cbc_open)) /
        parseFloat(cbc_open) *
        100
      ).toFixed(2);
      return value;
    },
    eth_filters(last, eth_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == eth_open || eth_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(eth_open) <= 0) return "0";
      var value = (
        (parseFloat(last) - parseFloat(eth_open)) /
        parseFloat(eth_open) *
        100
      ).toFixed(2);
      return value;
    }
  },
  created: function() {
    this.getTicker_list();
    let currency_to_currency = this.$store.state.user.currency_to_currency;
    let crypto_arr = currency_to_currency.split("_");
    this.exchange_from = crypto_arr[0];
    this.exchange_to = crypto_arr[1];
    this.load_list();
  },
  mounted: function() {
    this.initKline();
    var l_this = this;
    window.onresize = function temp() {
      var currentTime = new Date().getTime();
      var time = currentTime - l_this.freshTime;
      if (time > 1000) {
        setTimeout(() => {
          l_this.initKline();
        }, 1000);
      }
      l_this.freshTime = currentTime;
    };
  },
  beforeDestroy: function() {
    this.kline.pause();

    clearTimeout(this.ticker_timer);
  },
  methods: {
    search() {
      if (this.keyWord == "") {
        this.isFFTShow = true;
        this.isOSCShow = true;
        this.isDGCShow = true;
        this.isXDAGShow = true;
        this.isCBCShow = true;
        this.isETHShow = true;
        return;
      }
      var key = this.keyWord.toUpperCase();
      console.log("key = " + key);
      if ("FFT".indexOf(key) != -1) {
        this.isFFTShow = true;
      } else {
        this.isFFTShow = false;
      }
      if ("OSC".indexOf(key) != -1) {
        this.isOSCShow = true;
      } else {
        this.isOSCShow = false;
      }
      if ("DGC".indexOf(key) != -1) {
        this.isDGCShow = true;
      } else {
        this.isDGCShow = false;
      }
      if ("XDAG".indexOf(key) != -1) {
        this.isXDAGShow = true;
      } else {
        this.isXDAGShow = false;
      }
      if ("CBC".indexOf(key) != -1) {
        this.isCBCShow = true;
      } else {
        this.isCBCShow = false;
      }
      if ("ETH".indexOf(key) != -1) {
        this.isETHShow = true;
      } else {
        this.isETHShow = false;
      }
    },
    getHumanDate: function(timestamp) {
      if (timestamp == 0) return;
      return moment(timestamp).format("YYYY/MM/DD");
    },
    language_change: function() {
      this.$locale.change(this.language);
      storage.set("lang", this.language);
    },
    getPrice(price) {
      this.trade_price = price;
      //  alert(price)
    },
    load_list() {
      notice1
        .list()
        .then(result => {
          if (result.code == 0) {
            this.notices = result.data.notices;
          }
        })
        .catch(e => {});
    },
    notice(id) {
      this.$router.push("/notice/" + id);
    },
    initKline() {
      var w = document.body.clientWidth * 0.807;
      this.kline = new Kline({
        element: "#kline_container",
        symbol: this.exchange_from + "_" + this.exchange_to,
        width: w,
        height: 453,
        intervalTime: 5000,
        type: "poll", // poll/socket
        url: API_BASE_URL + EXCHANGE_KLINE,
        showTrade: false,
        subscribePath: "/",
        sendPath: "/",
        debug: false
      });
      this.kline.draw();
    },
    change_exchange_currency: function(from, to) {
      this.exchange_from = from;
      this.exchange_to = to;

      this.$store.commit(
        CURRENCY_TO_CURRENCY,
        this.exchange_from + "_" + this.exchange_to
      );
      // this.kline.setSymbol(this.exchange_to + "_" + this.exchange_from)
    },

    set_sell_price: function(price) {
      this.$refs.trade_box.set_sell_price(price);
    },
    onRefreshBalance: function() {
      //  console.log("onRefreshBalance")
      this.getBalance = new Date().getTime();
      //  getBalance
    },
    set_buy_price: function(price) {
      this.$refs.trade_box.set_buy_price(price);
    },
    currencyChange: function(currency_to_currency) {
      this.$store.commit(CURRENCY_TO_CURRENCY, currency_to_currency);
      let crypto_arr = currency_to_currency.split("_");
      this.exchange_from = crypto_arr[0];
      this.exchange_to = crypto_arr[1];
      this.kline.setSymbol(this.exchange_from + "_" + this.exchange_to);
    },
    getTicker_list: function() {
      clearTimeout(this.ticker_timer);
      if ("Exchange" != this.$route.name) {
        clearTimeout(this.ticker_timer);
        return;
      }
      let l_this = this;
      exchange
        .ticker_list("FFC")
        .then(data => {
          this.ticker_timer = setTimeout(this.getTicker_list, 5000);
          this.osc_open = data.data.tickers.OSC_FFC.open.toFixed(3);
          this.dgc_open = data.data.tickers.DGC_FFC.open.toFixed(3);
          this.xdag_open = data.data.tickers.XDAG_FFC.open.toFixed(3);
          this.fft_open = data.data.tickers.FFT_FFC.open.toFixed(3);
          // console.log("sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd");
          this.cbc_open = data.data.tickers.CBC_FFC.open.toFixed(3);
          this.eth_open = data.data.tickers.ETH_FFC.open.toFixed(4);
          this.OSC_PRICE = data.data.tickers.OSC_FFC.last.toFixed(3);
          this.DGC_PRICE = data.data.tickers.DGC_FFC.last.toFixed(3);
          this.XDAG_PRICE = data.data.tickers.XDAG_FFC.last.toFixed(3);
          this.FFT_PRICE = data.data.tickers.FFT_FFC.last.toFixed(3);
          this.CBC_PRICE = data.data.tickers.CBC_FFC.last.toFixed(3);
          this.ETH_PRICE = data.data.tickers.ETH_FFC.last.toFixed(3);
          this.osc_high = data.data.tickers.OSC_FFC.high.toFixed(3);
          this.osc_low = data.data.tickers.OSC_FFC.low.toFixed(3);
          this.dgc_high = data.data.tickers.DGC_FFC.high.toFixed(3);
          this.dgc_low = data.data.tickers.DGC_FFC.low.toFixed(3);
          this.xdag_high = data.data.tickers.XDAG_FFC.high.toFixed(3);
          this.xdag_low = data.data.tickers.XDAG_FFC.low.toFixed(3);
          this.fft_high = data.data.tickers.FFT_FFC.high.toFixed(3);
          this.fft_low = data.data.tickers.FFT_FFC.low.toFixed(3);
          this.cbc_high = data.data.tickers.CBC_FFC.high.toFixed(3);
          this.cbc_low = data.data.tickers.CBC_FFC.low.toFixed(3);
          this.eth_high = data.data.tickers.ETH_FFC.high.toFixed(3);
          this.eth_low = data.data.tickers.ETH_FFC.low.toFixed(3);
          this.osc_volume = data.data.tickers.OSC_FFC.volume.toFixed(2);
          this.dgc_volume = data.data.tickers.DGC_FFC.volume.toFixed(2);
          this.xdag_volume = data.data.tickers.XDAG_FFC.volume.toFixed(2);
          this.fft_volume = data.data.tickers.FFT_FFC.volume.toFixed(2);
          this.cbc_volume = data.data.tickers.CBC_FFC.volume.toFixed(2);
          this.eth_volume = data.data.tickers.ETH_FFC.volume.toFixed(2);
          this.osc_amount = data.data.tickers.OSC_FFC.amount.toFixed(2);
          this.dgc_amount = data.data.tickers.DGC_FFC.amount.toFixed(2);
          this.xdag_amount = data.data.tickers.XDAG_FFC.amount.toFixed(2);
          this.fft_amount = data.data.tickers.FFT_FFC.amount.toFixed(2);
          this.cbc_amount = data.data.tickers.CBC_FFC.amount.toFixed(2);
          this.eth_amount = data.data.tickers.ETH_FFC.amount.toFixed(2);

          if (this.exchange_from == "OSC") {
            var value = (
              (parseFloat(this.OSC_PRICE) - parseFloat(this.osc_open)) /
              parseFloat(this.osc_open) *
              100
            ).toFixed(2);

            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.OSC_PRICE) >= parseFloat(l_this.osc_open)) {
              this.current_price = this.OSC_PRICE + "_+" + value;
            } else {
              this.current_price = this.OSC_PRICE + "_" + value;
            }

            l_this.$refs.realtime_box.current_price(this.current_price);
          }

          if (this.exchange_from == "DGC") {
            var value = (
              (parseFloat(this.DGC_PRICE) - parseFloat(this.dgc_open)) /
              parseFloat(this.dgc_open) *
              100
            ).toFixed(2);
            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.DGC_PRICE) >= parseFloat(l_this.dgc_open)) {
              this.current_price = this.DGC_PRICE + "_+" + value;
            } else {
              this.current_price = this.DGC_PRICE + "_" + value;
            }
            l_this.$refs.realtime_box.current_price(this.current_price);
          }

          if (this.exchange_from == "XDAG") {
            var value = (
              (parseFloat(this.XDAG_PRICE) - parseFloat(this.xdag_open)) /
              parseFloat(this.xdag_open) *
              100
            ).toFixed(2);
            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.XDAG_PRICE) >= parseFloat(l_this.xdag_open)) {
              this.current_price = this.XDAG_PRICE + "_+" + value;
            } else {
              this.current_price = this.XDAG_PRICE + "_" + value;
            }
            l_this.$refs.realtime_box.current_price(this.current_price);
          }
          if (this.exchange_from == "FFT") {
            var value = (
              (parseFloat(this.FFT_PRICE) - parseFloat(this.fft_open)) /
              parseFloat(this.fft_open) *
              100
            ).toFixed(2);
            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.FFT_PRICE) >= parseFloat(l_this.fft_open)) {
              this.current_price = this.FFT_PRICE + "_+" + value;
            } else {
              this.current_price = this.FFT_PRICE + "_" + value;
            }
            l_this.$refs.realtime_box.current_price(this.current_price);
          }
          if (this.exchange_from == "CBC") {
            var value = (
              (parseFloat(this.CBC_PRICE) - parseFloat(this.cbc_open)) /
              parseFloat(this.cbc_open) *
              100
            ).toFixed(2);
            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.CBC_PRICE) >= parseFloat(l_this.cbc_open)) {
              this.current_price = this.CBC_PRICE + "_+" + value;
            } else {
              this.current_price = this.CBC_PRICE + "_" + value;
            }
            l_this.$refs.realtime_box.current_price(this.current_price);
          }
          if (this.exchange_from == "ETH") {
            var value = (
              (parseFloat(this.ETH_PRICE) - parseFloat(this.eth_open)) /
              parseFloat(this.eth_open) *
              100
            ).toFixed(2);
            if ("NaN" == value) value = 0;
            if (parseFloat(l_this.ETH_PRICE) >= parseFloat(l_this.eth_open)) {
              this.current_price = this.ETH_PRICE + "_+" + value;
            } else {
              this.current_price = this.ETH_PRICE + "_" + value;
            }
            l_this.$refs.realtime_box.current_price(this.current_price);
          }
        })
        .catch(e => {
          this.ticker_timer = setTimeout(this.getTicker_list, 5000);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/exchange/kline.css";
@import "../../assets/css/Exchange2.scss";
</style>