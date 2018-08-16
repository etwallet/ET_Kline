<template>
<div> 
  <Top class="home-top"></Top>
  <div class="content-exchange">
      
   <div style="margin-top:70px;">
      <div class="div-bananer" >
            <div 
            class="div-bananer-item"
            >
            <p>今日开盘价</p>
            {{priceInfo.open|dataFilters}} EOS
            </div>
            <div 
            class="div-bananer-item"
            style="margin-left:24px;"
            >
            <p>{{crypto_currency=='RAM/EOS' ?"总资金":"今日交易量"}}   </p>
            {{crypto_currency=='RAM/EOS' ? priceInfo.total_eos+" EOS":priceInfo.today_volum+" "+priceInfo.base_balance_uom}}  
            </div>
            <div 
            class="div-bananer-item"
             style="margin-left:24px;"
              v-show="crypto_currency=='RAM/EOS'"
            >
                  <p>全盘占比</p>
                {{priceInfo.usage_ram }}GB / {{priceInfo.total_ram }}GB
                <div class="bar">
                    <div :style='"width:"+priceInfo.usage_ram_percent*100+"%;"' ></div>
                </div>
            </div>
      </div>

      </div>
      <div style="margin-top:20px;">
        <span style="color:#808080;font-size:16px">最新价格&nbsp;</span>
        <span style="color:#41B57C;font-size:48px">{{priceInfo.price|dataFilters}}</span>
        <span style="color:#999999;font-size:28px" v-show="crypto_currency=='RAM/EOS'">&nbsp;RAM</span>
        <span style="color:#999999;font-size:28px" v-show="crypto_currency!='RAM/EOS'">&nbsp;EOS</span>
        <!-- <a href="http://www.eostoken.im" style="color:#FB5F5F;font-size:20px;margin-left:5px">钱包下载</a> -->
      </div>
      <div class="kline-top" style="margin-bottom:15px">
        <div class="kline-top-item">
          <span style="color:#808080;font-size:16px">当日涨幅&nbsp;</span>
          <span style="color:#41B57C;font-size:33px" v-show="priceInfo.increase>=0">{{priceInfo.increase | dataFilters1}}</span>
          <span style="color:#FB5F5F;font-size:33px" v-show="priceInfo.increase<0">{{priceInfo.increase | dataFilters1}}</span>
        </div>
        <div class="kline-top-item">
          <span style="color:#808080;font-size:16px">&nbsp;</span>
          <span style="color:#41B57C;font-size:33px"></span>
        </div>
        <div class="kline-top-item">
          <span style="color:#808080;font-size:16px">&nbsp;</span>
          <span style="color:#FB5F5F;font-size:33px"></span>
        </div>
        <div class="kline-top-item">
           <el-select v-model="crypto_currency" placeholder="请选择" style="width:100%;" @change="cryptoCurrencyChange" > 
          <el-option
            v-for="item in crypto_currency_list"
            :key="item.code"
            :label="item.trade_uom"
            :value="item.code"  >
          </el-option>
        </el-select>
        </div>
      </div>

      <div id="kline_container" class="kline" style="width:1200px;margin-top:5px"></div>
       <div style="width:100%;display:flex;margin-top:10px;"  v-show="!isSeaarchResult">
          <div style="flex:1"></div>
          <div style="flex:1"></div>
          <div style="flex:1"></div>
         <div style="display:flex;float:right;flex:1">
          <div class="div-right1" style="width: 78%;">
            <div style="position: relative;display:flex; margin-top:8px;">
                 <div></div>   <input   class="trade_input1" @keydown="searchKeyWord" type="text" v-model="keyWordValue" placeholder="  输入账号搜索交易记录"  @input="searchKeyWord"> 
                    <i class="search_btn1" style="position: absolute;left:12px;top:7px;"></i>
            </div>
          </div>
          <button class="btn-search1" @click="searchTrades(-1)">搜索</button>
        </div>
       </div>
      <div class="div-data" v-show="!isSeaarchResult">
        <div class="div-data-item">
          <div class="div-data-item-title">最新交易记录</div>

            <div  style="font-size:16px;" v-for="(item,index) in newDatas" :key="index">
              <div  v-show="crypto_currency=='RAM/EOS'" style="padding:10px 20px;display:flex;">
              <div style="flex:1;color:#3CB3FF;cursor:pointer;" @click="search(item.payer)">{{item.payer }}</div> 
              <div style="flex:1;color:#FF5959;padding-left:20px;" v-show="item.action_name=='sellram'">卖出：{{item.eos_qty}}</div>
              <div style="flex:1;color:#53B987;padding-left:20px;"  v-show="item.action_name=='buyram'">买入：{{item.eos_qty}}</div> </div>
              <div  v-show="crypto_currency!='RAM/EOS'" style="padding:10px 20px;display:flex;">
              <div style="flex:1;color:#3CB3FF;cursor:pointer;" @click="search(item.account)">{{item.account }}</div> 
              <div style="flex:1;color:#FF5959;padding-left:20px;" v-show="item.action_name=='selltoken'">卖出：{{item.token_qty}}</div>
              <div style="flex:1;color:#53B987;padding-left:20px;"  v-show="item.action_name=='buytoken'">买入：{{item.token_qty}}</div> 
              </div>
             <div style="padding:0px 20px 10px 20px;display:flex;"><div style="flex:1;color:#999">{{item.record_date|mountTime}}</div> <div style="flex:1;color:#999;padding-left:20px;">价格：{{item.price|dataFilters}}</div></div>
             <div style="width:90%;margin-left:auto;margin-right:auto;height:1px;background:#ccc" v-show="index != newDatas.length-1"></div>
            </div>
            <!-- <el-pagination
            layout="prev, pager, next"
            :total="newTotal" :page-size="new_pre_page" class="pagination" @current-change="pageChange" v-if="newTotal > new_pre_page">
          </el-pagination> -->
        </div>
        <div class="div-data-item" style="margin-left:8px;">
          <div class="div-data-item-title">最新大单交易</div>
          <div  style="font-size:16px;" v-for="(item,index) in maxDatas" :key="index">
             <div  v-show="crypto_currency!='RAM/EOS'" style="padding:10px 20px;display:flex;"><div style="flex:1;color:#3CB3FF;cursor:pointer;"  @click="search(item.account)">{{item.account }}</div> <div style="flex:1;color:#FF5959;padding-left:20px;" v-show="item.action_name=='selltoken'">卖出：{{item.token_qty}}</div><div style="flex:1;color:#53B987;padding-left:20px;"  v-show="item.action_name=='buytoken'">买入：{{item.token_qty}}</div> </div>
             <div  v-show="crypto_currency=='RAM/EOS'" style="padding:10px 20px;display:flex;"><div style="flex:1;color:#3CB3FF;cursor:pointer;" @click="search(item.payer)">{{item.payer }}</div> <div style="flex:1;color:#FF5959;padding-left:20px;" v-show="item.action_name=='sellram'">卖出：{{item.eos_qty}}</div><div style="flex:1;color:#53B987;padding-left:20px;"  v-show="item.action_name=='buyram'">买入：{{item.eos_qty}}</div> </div>
             <div style="padding:0px 20px 10px 20px;display:flex;"><div style="flex:1;color:#999">{{item.record_date|mountTime}}</div> <div style="flex:1;color:#999;padding-left:20px;">价格：{{item.price|dataFilters}}</div></div>
              <div style="width:90%;margin-left:auto;margin-right:auto;height:1px;background:#ccc" v-show="index != maxDatas.length-1"></div>
          </div>
        </div>
        <div class="div-data-item" style="margin-left:8px;" v-show="crypto_currency=='RAM/EOS'">
          <div class="div-data-item-title" v-show="crypto_currency=='RAM/EOS'">持仓排行</div>
          <div  style="font-size:16px;" v-for="(item,index) in largeDatas" :key="index" v-show="crypto_currency=='RAM/EOS'">
              <div style="padding:10px 20px;display:flex;"><div style="flex:1;color:#3CB3FF;cursor:pointer;" @click="search(item.account)">{{index+1}}：{{item.account}}</div> <div style="flex:1;color:#FF5959;padding-left:20px;" v-show="item.profit.indexOf('-')>=0?true:false">盈亏：{{item.profit}}</div><div style="flex:1;color:#53B987;padding-left:20px;"   v-show="item.profit.indexOf('+')>=0?true:false">盈亏：{{item.profit}}</div> </div>
             <div style="padding:0px 20px 10px 20px;display:flex;"><div style="flex:1;color:#999">持仓：{{item.ramQuota}}</div> <div style="flex:1;color:#999;padding-left:20px;">均价：{{item.historyAverageCost|dataFilters}}</div></div>
             <div style="width:90%;margin-left:auto;margin-right:auto;height:1px;background:#ccc" v-show="index != maxDatas.length-1"></div>
          </div>
        </div>
        
      </div>  
      <!--搜索-->
      <div class="div-data-search" v-show="isSeaarchResult">
        <div class="div-data-item-search">
          <div class="div-data-item-title-search">交易记录 > 账户详情 <span style="float:right;margin-right:20px;cursor:pointer;" @click="closeSearch">X</span></div>
           <div class="div-data-item-title-search-top">
             <div class="div-data-item-title-search-top-item">操作者</div>
             <div class="div-data-item-title-search-top-item">类型</div>
             <div class="div-data-item-title-search-top-item">数量<span v-show="crypto_currency =='RAM/EOS'" >(RAM)</span><span v-show="crypto_currency !='RAM/EOS'" >({{exchange_from}})</span></div>
             <div class="div-data-item-title-search-top-item">价格<span>(EOS)</span></div>
             <div class="div-data-item-title-search-top-item">时间戳</div>		
           </div>
            <div  v-show="crypto_currency =='RAM/EOS'"  style="font-size:25px;display:flex;text-align: center; line-height: 1.5;cursor:pointer;" v-for="(item,index) in searchDatas" :key="index" @click="openExplorer('https://eospark.com/MainNet/tx/'+item.trx_id)">
              <div style="flex:1;color:#808080">{{item.payer}}</div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buyram'" style="color:#5ABD8C">购买</span><span v-show="item.action_name=='sellram'"  style="color:#FB5F5F">出售</span></div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buyram'" style="color:#5ABD8C">{{item.ram_qty}}</span><span v-show="item.action_name=='sellram'"  style="color:#FB5F5F">{{item.ram_qty}}</span></div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buyram'" style="color:#5ABD8C">{{item.price|dataFilters}}</span><span v-show="item.action_name=='sellram'"  style="color:#FB5F5F">{{item.price|dataFilters}}</span></div>
              <div style="flex:1;color:#808080">{{item.record_date}}</div>
            </div>
            <div  v-show="crypto_currency !='RAM/EOS'"  style="font-size:25px;display:flex;text-align: center; line-height: 1.5;cursor:pointer;" v-for="(item,index) in searchDatas" :key="index" @click="openExplorer('https://eospark.com/MainNet/tx/'+item.trx_id)">
              <div style="flex:1;color:#808080">{{item.account}}</div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buytoken'" style="color:#5ABD8C">购买</span><span v-show="item.action_name=='selltoken'"  style="color:#FB5F5F">出售</span></div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buytoken'" style="color:#5ABD8C">{{item.token_qty|dataFilters2}}</span><span v-show="item.action_name=='selltoken'"  style="color:#FB5F5F">{{item.token_qty|dataFilters2}}</span></div>
              <div style="flex:1;color:#808080"><span v-show="item.action_name=='buytoken'" style="color:#5ABD8C">{{item.price|dataFilters}}</span><span v-show="item.action_name=='selltoken'"  style="color:#FB5F5F">{{item.price|dataFilters}}</span></div>
              <div style="flex:1;color:#808080">{{item.record_date}}</div>
            </div>
             <div style="padding:10px 10px 10px 10px; font-size: 16px;line-height: 2;" v-show="isMore">
              <span style="padding:6px 10px 6px 10px; color: #fff;border: #4598e0;
                 border-radius: 3px; text-align: center;background: #4598e0;cursor:pointer;" @click="up" >{{pageIndex==0?"首页":"上一页"}}</span>
              <span style="margin-left:20px;padding:6px 10px 6px 10px; color: #fff;line-height:2;border: #4598e0;
                 border-radius: 3px; text-align: center;background: #4598e0;cursor:pointer;" @click="next">下一页</span>
             </div>
     
        </div>

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
import _moment from "moment/min/moment-with-locales";

import { API_BASE_URL, EXCHANGE_KLINE } from "../../models/url";

export default {
  name: "Index",
  components: {
    Top,
    SelectMenu,
    RealtimeBox,
    TradeBox
  },
  data() {
    return {
      radixPoint: 8,
      exchange_from: "TEST",
      exchange_to: "EOS",
      ticker_timer: null,
      freshTime: new Date().getTime(),
      crypto_currency: "RAM/EOS",
      crypto_currency_list: [{ trade_uom: "RAM/EOS" }],
      newDatas: [],
      maxDatas: [],
      largeDatas: [],
      searchDatas: [],
      new_pre_page: 6,
      current_page: 1,
      newTotal: 30,
      priceInfo: { open: 0, trading_volum: 0, price: 0 },
      code: "",
      keyWordValue: "",
      isSeaarchResult: false,
      pageIndex: 0,
      pageJson: {},
      isLoading: false,
      isMore: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  filters: {
    dataFilters(data) {
      if (undefined == data || data == "") return "";
      return parseFloat(data).toFixed(8);
    },
    dataFilters1(data) {
      if (undefined == data || data == "") return "";
      return (parseFloat(data) * 100).toFixed(2) + " %";
    },
   dataFilters2(data) {
      if (undefined == data || data == "") return "";
      return parseFloat(data).toFixed(4);
    },
    mountTime(time) {
      return _moment(time)
        .add(8, "hours")
        .fromNow();
    }
  },
  // mountTime(){

  // },
  created: function() {
    this.get_exchange_list();
    this.initRamData();
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
  // formatDatetwo: function(time) {
  //     var re = /-?\d+/;
  //     var m = re.exec(time);
  //     var d = new Date(parseInt(m[0]));
  //     var o = {
  //       "M+": d.getMonth() + 1, //month
  //       "d+": d.getDate(), //day
  //       "h+": d.getHours(), //hour
  //       "m+": d.getMinutes(), //minute
  //       "s+": d.getSeconds(), //second
  //       "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
  //       S: d.getMilliseconds() //millisecond
  //     };
  //     var format = "yyyy-MM-dd";
  //     if (/(y+)/.test(format)) {
  //       format = format.replace(
  //         RegExp.$1,
  //         (d.getFullYear() + "").substr(4 - RegExp.$1.length)
  //       );
  //     }
  //     for (var k in o) {
  //       if (new RegExp("(" + k + ")").test(format)) {
  //         format = format.replace(
  //           RegExp.$1,
  //           RegExp.$1.length == 1
  //             ? o[k]
  //             : ("00" + o[k]).substr(("" + o[k]).length)
  //         );
  //       }
  //     }
  //     return format;
  //   },
  methods: {
    cryptoCurrencyChange: function(key) {
      this.code = key;
      if (this.crypto_currency == undefined) this.crypto_currency = "RAM/EOS";
      console.log(
        "cryptoCurrencyChange = this.crypto_currency = " + this.crypto_currency
      );
      if (this.crypto_currency == "RAM/EOS") {
        this.initRamData();
        this.initKline();
      } else {
        this.initExchangeData();
        this.initKline2();
      }
    },
    initRamData() {
      this.getRamPriceInfo();
      this.getRamPriceNewTradesOrders();
      this.getRamPriceMaxTradesOrders();
      this.getRamPriceLargeTradesOrders();
    },
    initExchangeData() {
      this.getExchangePriceInfo();
      this.getExchangePriceNewTradesOrders();
      this.getExchangePriceBigTradesOrders();
    },

    getHumanDate: function(timestamp) {
      if (timestamp == 0) return;
      return moment(timestamp).format("YYYY/MM/DD");
    },

    initKline() {
      var w = 1200;
      this.kline = new Kline({
        element: "#kline_container",
        symbol: this.crypto_currency,
        width: w,
        height: 453,
        intervalTime: 5000,
        type: "poll", // poll/socket
        url: API_BASE_URL + "/ramprice/getRamKLines2",
        showTrade: false,
        subscribePath: "/",
        sendPath: "/",
        debug: false
      });
      this.kline.draw();
    },
    initKline2() {
      var w = 1200;
      this.kline = new Kline({
        element: "#kline_container",
        symbol: this.crypto_currency,
        width: w,
        height: 453,
        intervalTime: 5000,
        type: "poll", // poll/socket
        url: API_BASE_URL + "/etExchangePrice/kline2",
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
    },
    onRefreshBalance: function() {
      this.getBalance = new Date().getTime();
    },

    getTicker_list: function() {},
    get_exchange_list: function() {
      exchange
        .exchange_list()
        .then(data => {
          this.crypto_currency_list = [{ trade_uom: "RAM/EOS" }];
          this.crypto_currency_list = this.crypto_currency_list.concat(data);
        })
        .catch(e => {});
    },
    getRamPriceInfo: function() {
      exchange
        .ramPriceInfo()
        .then(data => {
          this.priceInfo = data;
        })
        .catch(e => {});
    },
    getRamPriceNewTradesOrders: function() {
      exchange
        .ramPriceNewTradesOrders()
        .then(data => {
          this.newDatas = data;
        })
        .catch(e => {});
    },
    getRamPriceMaxTradesOrders: function() {
      exchange
        .ramPriceBigTradesOrders()
        .then(data => {
          this.maxDatas = data;
        })
        .catch(e => {});
    },
    getRamPriceLargeTradesOrders: function() {
      exchange
        .ramPriceLargeTradesOrders()
        .then(data => {
          this.largeDatas = data;
        })
        .catch(e => {});
    },
    getExchangePriceNewTradesOrders: function() {
      exchange
        .exchangePriceNewTredeOrder(this.code)
        .then(data => {
          this.newDatas = data;
        })
        .catch(e => {});
    },
    getExchangePriceBigTradesOrders: function() {
      exchange
        .exchangePriceBigTredeOrder(this.code)
        .then(data => {
          this.maxDatas = data;
        })
        .catch(e => {});
    },

    getExchangePriceInfo: function() {
      exchange
        .echangePriceInfo(this.code)
        .then(data => {
          this.priceInfo = data;
        })
        .catch(e => {});
    },
    searchKeyWord() {},
    pageChange(value) {
      // this.pageIndex = value - 2;
      // this.searchTrades();
    },
    search(key) {
      this.pageIndex = 0;
      this.pageJson[this.pageIndex] = -1;
      this.keyWordValue = key;
      this.isLoading = false;
      this.searchTrades(this.pageJson[this.pageIndex]);
    },
    closeSearch() {
      this.keyWordValue = "";
      this.isSeaarchResult = false;
    },
    openExplorer(address) {
      // this.keyWordValue = "";
      // this.isSeaarchResult = false;
      // window.open('http:\\www.baidu.com');
      window.open(address, "_blank");
    },
    up() {
      if (this.isLoading || this.pageIndex == 0) return;
      this.pageIndex = this.pageIndex - 1;
      this.searchTrades(this.pageJson[this.pageIndex]);
    },
    next() {
      if (this.isLoading) return;
      this.pageIndex = this.pageIndex + 1;
      if (this.pageIndex >= this.pageJson.length) return;
      this.pageJson[this.pageIndex] = this.searchDatas[
        this.searchDatas.length - 1
      ]._id;
      this.searchTrades(this.pageJson[this.pageIndex]);
    },
    searchTrades(lastId) {
      this.isLoading = true;

      if (this.crypto_currency == "RAM/EOS") {
        exchange
          .ramPriceNewTradeOrdersByAccountName(this.keyWordValue, 10, lastId)
          .then(data => {
            this.isLoading = false;
            // console.log("data = "+data)
            this.isSeaarchResult = true;
            this.searchDatas = data;
            if (lastId == -1) {
              if (this.searchDatas.length < 10) {
                this.isMore = false;
              } else {
                this.isMore = true;
              }
            }
          })
          .catch(e => {
            this.isLoading = false;
          });
      } else {
        exchange
          .etExchangePriceNewTradeOrdersByAccountName(
            this.code,
            this.keyWordValue,
            10,
            lastId
          )
          .then(data => {
            this.isLoading = false;
            // console.log("data = "+data)
            this.isSeaarchResult = true;
            this.searchDatas = data;
            if (lastId == -1) {
              if (this.searchDatas.length < 10) {
                this.isMore = false;
              } else {
                this.isMore = true;
              }
            }
          })
          .catch(e => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/exchange/kline.css";
@import "../../assets/css/Exchange2.scss";
</style>