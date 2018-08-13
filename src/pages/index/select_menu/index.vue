<template>
  <div>
    <div class="currency-zone">
       <span v-show="exchange_from==='OSC'"><i class="osc_ico" ></i>{{exchange_from}} / {{exchange_to}}</span>
    <span v-show="exchange_from==='DGC'"><i class="dgc_ico"></i>{{exchange_from}} / {{exchange_to}}</span>
    </div>
    <div class="select_menu">
    <div>
    <div class="current">
      <!-- <span>{{exchange_from}} {{$t('Basic.'+ exchange_from)}} / {{exchange_to}} {{$t('Basic.'+ exchange_to)}}</span> -->
      <span>{{last}}&nbsp;FFC</span>
      <!-- <i class="icon iconfont icon-fanhui-copy"></i> -->
      <!-- <div class="select_info" :class="{hide:select_info_hide}">
        <ul class="currency_category">
          <li class="currency_category_item">
            <div class="category_name">BTC {{$t('Basic.BTC')}}</div>
            <ul>
              <li :class="{active:exchange_from == 'OSC' && exchange_to == 'FFD'}" @click="set_currency('OSC', 'FFD')">OSC/FFD</li>
              <li :class="{active:exchange_from == 'BTC' && exchange_to == 'LTC'}" @click="set_currency('BTC', 'LTC')">LTC/BTC</li>
              <li :class="{active:exchange_from == 'BTC' && exchange_to == 'SBTC'}" @click="set_currency('BTC', 'SBTC')">SBTC/BTC</li>
            </ul>
          </li>
          <li class="currency_category_item">
            <div class="category_name">ETH {{$t('Basic.ETH')}}</div>
            <ul>
              <li :class="{active:exchange_from == 'ETH' && exchange_to == 'OSC'}" @click="set_currency('ETH', 'OSC')">OSC/ETH</li>
            </ul>
          </li>
        </ul>
      </div> -->
    </div>
    </div>
    <div class="exchange_info">
      <div class="info_item">{{$t('Exchange.TickerLast')}}<br/><span>{{last}} {{exchange_to}}</span></div>
      <div class="info_item">{{$t('Exchange.TickerLow')}}<br/><span class="red">{{low}} {{exchange_to}}</span></div>
      <div class="info_item">{{$t('Exchange.TickerHigh')}}<br/><span class="green">{{high}} {{exchange_to}}</span></div>
      <div class="info_item">{{$t('Exchange.TickerVolume')}}<br/><span>{{volume}} {{exchange_from }}</span></div>
      <div class="info_item" style="padding-right:0px;">{{$t('Exchange.TickerAmount')}}<br/><span>{{amount}} {{exchange_to}}</span></div>
    </div>
    </div>
  </div>
</template>
<script>
import exchange from "../../../models/exchange";
export default {
  name: "ExchangeSelectMenu",
  components: {},
  props: ["exchange_from", "exchange_to"],
  data() {
    return {
      select_info_hide: false,

      frozen_qty: 0.01,
      available_qty: 0.01,
      amount: 0,
      buy: 0,
      high: 0,
      low: 0,
      sell: 0,
      volume: 0,
      last: 0,
      ticker_timer: null
    };
  },
  created: function() {
    this.load_ticker();
  },
  beforeDestroy: function() {
    clearTimeout(this.ticker_timer);
  },
  methods: {
    set_currency: function(from, to) {
      this.$emit("change_exchange_currency", from, to);
      this.select_info_hide = true;
      clearTimeout(this.ticker_timer);
      this.amount = 0;
      this.buy = 0;
      this.high = 0;
      this.low = 0;
      this.sell = 0;
      this.volume = 0;
      this.last = 0;
      exchange.cancelAll();
      setTimeout(() => {
        this.select_info_hide = false;
        this.load_ticker();
      }, 500);
    },
    check_in_page: function() {
      if (this.$route.name != "Exchange") {
        return false;
      }
      return true;
    },
    load_ticker: function() {
      clearTimeout(this.ticker_timer);
      exchange
        .ticker(this.exchange_from + "_" + this.exchange_to)
        .then(data => {
          if (!this.check_in_page()) {
            return false;
          }
          this.amount = data.data.ticker.amount;
          this.buy = data.data.ticker.buy;
          this.high = data.data.ticker.high;
          this.low = data.data.ticker.low;
          this.sell = data.data.ticker.sell;
          this.volume = data.data.ticker.volume;
          this.last = data.data.ticker.last;
          this.ticker_timer = setTimeout(this.load_ticker, 10000);
        })
        .catch(() => {
          if (!this.check_in_page()) {
            return false;
          }
          this.ticker_timer = setTimeout(this.load_ticker, 10000);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/exchange/SelectMenu.scss";
</style>