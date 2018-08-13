<template>
<el-row :gutter="10" style="min-width:100%;height:447px;">
  <el-col :span="12">
    <div class="buy_sell_box">
      <div class="buy_sell_box_th" style="padding-bottom:2px">
        <span class="title1">{{$t('Exchange.Table.Buy_Sell')}}</span>
        <span class="title2">{{$t('Exchange.Table.Price')}}</span>
        <span class="title3">{{$t('Exchange.Table.Num')}}</span>
        <span class="title4">{{$t('Exchange.Table.All_Price')}}</span>
      </div>
      <div class="buy_sell_box_th"  v-for="(item,index) in sell_list" :key="index" @click="set_buy_price(item[0])">
        <div class="red_bg"  :style="{width:(item[2])+'%'}"></div>
        <span class="title1"><span class="red">{{$t('Exchange.Table.Sell')}}{{sell_list.length - index }}</span></span>
        <span class="title2"><span class="red" >{{item[0].toFixed(3)}}</span></span>
        <span class="title3">{{format(item[1])}}</span>
        <span class="title4">{{(format(item[1])*item[0]).toFixed(3)}}</span>
      </div>
      <div class="new-data" v-show="percent.indexOf('+') == -1">
        {{price}}<span class="red" >{{percent}}%</span>
      </div>
      <div class="new-data" v-show="percent.indexOf('+') != -1">
        {{price}}<span class="green">{{percent}}%</span>
      </div>
      
       <div class="buy_sell_box_th"  v-for="(item,index) in buy_list" :key="index" @click="set_sell_price(item[0])">
        <div class="green_bg" :style="{width:(item[2])+'%'}"></div>
        <span class="title1"><span class="green">{{$t('Exchange.Table.Buy')}}{{index+1 }}</span></span>
        <span class="title2"><span class="green">{{item[0].toFixed(3)}}</span></span>
        <span class="title3">{{format(item[1])}}</span>
        <span class="title4">{{(format(item[1])*item[0]).toFixed(3)}}</span>
      </div>
    </div>
  </el-col>
  <el-col :span="12">
    <div class="new_deal">
      <div class="new_deal_box_th" style="padding-bottom:2px">
        <span class="title1">{{$t('Exchange.Table.Time0')}}</span>
        <span class="title2">{{$t('Exchange.Table.TradePrice0')}}</span>
        <span class="title3">{{$t('Exchange.Table.TradeNum0')}}</span>
      </div>
      <div class="new_deal_data_box">
        <div class="new_deal_box_th" v-for="(item,index) in trade_list" :key="index">
        <span class="title1">{{getHumanDate(item.time)}}</span>
        <span class="title2"><span class="green"  v-bind:class="{ red: item.type=='sell' }">{{item.price.toFixed(3)}}</span></span>
        <span class="title3"><span class="green"  v-bind:class="{ red: item.type=='sell' }">{{format(item.amount)}}</span></span>
      </div>
      </div>
    </div>
  </el-col>
</el-row>


</template>
<script>
import exchange from "../../../models/exchange";

import lib from "../../../utils/lib";
import moment from "../../../utils/moment";
export default {
  name: "ExchangeRealtimeBox",
  components: {},
  props: ["exchange_from", "exchange_to"],
  watch: {
    exchange_from: function() {
      this.reload_list();
      this.trade_list = [];
      this.buy_list = [];
      this.sell_list = [];
    },
    exchange_to: function() {
      this.reload_list();
    }
  },
  data() {
    return {
      currency: "OSC",
      buy_list: [],
      sell_list: [],
      trade_list: [],
      depth_timer: null,
      trades_timer: null,
      activeName2: "zore",
      price: "",
      percent: ""
    };
  },
  created: function() {
    this.load_depth();
    this.load_trades();
  },
  beforeDestroy: function() {
    clearTimeout(this.depth_timer);
    clearTimeout(this.trades_timer);
  },
  methods: {
    handleClick() {},
    getHumanDate: function(timestamp) {
      return moment(timestamp).format("HH:mm");
    },
    format: function(str) {
      return lib.toFixed(str, 8);
    },
    check_in_page: function() {
      if (this.$route.name != "Exchange") {
        return false;
      }
      return true;
    },
    load_depth: function() {
      clearTimeout(this.depth_timer);
      exchange
        .depth(this.exchange_from + "_" + this.exchange_to)
        .then(data => {
          if (!this.check_in_page()) {
            return false;
          }

          let buy_list1 = [];
          if (data.data.depths.bids == undefined) {
            data.data.depths.bids = [[0, 0, 0]];
          }
          if (data.data.depths.bids.length > 7) {
            buy_list1 = data.data.depths.bids.slice(0, 7);
          } else {
            for (var i = data.data.depths.bids.length; i < 7; i++) {
              data.data.depths.bids = data.data.depths.bids.concat([[0, 0, 0]]);
            }
            buy_list1 = data.data.depths.bids;
          }
          if (data.data.depths.asks == undefined) {
            data.data.depths.asks = [[0, 0, 0]];
          }
          let sell_list1 = [];
          if (data.data.depths.asks.length > 7) {
            sell_list1 = data.data.depths.asks.slice(0, 7).reverse();
          } else {
            for (var i = data.data.depths.asks.length; i < 7; i++) {
              data.data.depths.asks = data.data.depths.asks.concat([[0, 0, 0]]);
            }
            sell_list1 = data.data.depths.asks.reverse();
          }

          var buySum = 0.01;
          var sellSum = 0.01;
          for (var j = 0; j < buy_list1.length; j++) {
            // buySum = buySum + parseFloat((buy_list1[j])[1])
            if (parseFloat(buy_list1[j][1]) > buySum) {
              buySum = parseFloat(buy_list1[j][1]);
            }
          }
          for (var jj = 0; jj < sell_list1.length; jj++) {
            // sellSum = sellSum + parseFloat((sell_list1[jj])[1])
            if (parseFloat(sell_list1[jj][1]) > buySum) {
              buySum = parseFloat(sell_list1[jj][1]);
            }
          }
          for (var k = 0; k < buy_list1.length; k++) {
            buy_list1[k][2] = (buy_list1[k][1] + 0.0001) * 100 / buySum;
          }
          for (var kk = 0; kk < sell_list1.length; kk++) {
            sell_list1[kk][2] = (sell_list1[kk][1] + 0.0001) * 100 / buySum;
          }
          this.buy_list = buy_list1;
          this.sell_list = sell_list1;

          // this.$emit(
          //   "price",
          //   data.data.depths.bids[0][0] + "_" + this.sell_list[6][0]
          // );
          this.depth_timer = setTimeout(this.load_depth, 10000);
        })
        .catch(() => {
          // this.buy_list = []
          // this.sell_list = []
          if (!this.check_in_page()) {
            return false;
          }
          this.depth_timer = setTimeout(this.load_depth, 10000);
        });
    },
    load_trades: function() {
      clearTimeout(this.trades_timer);
      exchange
        .trades(this.exchange_from + "_" + this.exchange_to)
        .then(data => {
          if (!this.check_in_page()) {
            return false;
          }
          this.trade_list = data.data.trades;
          this.trades_timer = setTimeout(this.load_trades, 10000);
        })
        .catch(() => {
          if (!this.check_in_page()) {
            return false;
          }
          this.trades_timer = setTimeout(this.load_trades, 10000);
        });
    },
    reload_list: function() {
      // this.buy_list = []
      // this.sell_list = []
      this.trade_list = [];
      clearTimeout(this.depth_timer);
      clearTimeout(this.trades_timer);
      this.load_depth();
      this.load_trades();
    },
    set_sell_price: function(price) {
      if (price != null) this.$emit("set_sell_price", price);
    },
    set_buy_price: function(price) {
      if (price != null) this.$emit("set_buy_price", price);
    },
    current_price: function(price_percent) {
      // alert("dsf" + price_percent);
      if (price_percent.indexOf("_") != -1) {
        let prices = price_percent.split("_");
        this.price = prices[0];
        this.percent = prices[1];
        // alert(this.percent)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/exchange2/RealtimeBox.scss";
</style>