<template>
  <div class="trade_box" :class="{'frozen':!is_login}">
    <div class="trade_box_content_zone">
        
        <div class="trade_choise_buysell_zone">
          <el-row :gutter="20" style="min-width:100%;margin:0px;">
            <el-col :span="12">
              <div class="box rborder buy">
      <div class="banlance">{{exchange_to}}{{$t('Exchange.Blance')}} <span>{{to_amount}}</span>
        <span class="recharge-btn">
          <router-link :to="{ name: 'WalletCny', params:{activeName: 'first'}}">
              {{$t('Exchange.RechargeBtn')}}
           </router-link>
        </span>
      </div>
            <el-radio v-model="buy_type" label="0">{{$t('Exchange.LimitOrder')}}</el-radio>
            <el-radio v-model="buy_type" label="1">{{$t('Exchange.MarketOrder')}}</el-radio>
      <!-- <select class="type_select" v-model="buy_type">
        <option value="0">{{$t('Exchange.LimitPrice')}}</option>
        <option value="1">{{$t('Exchange.MarketPrice')}}</option>
      </select> -->
      <div class="price_limit" v-if="buy_type == 0">
        <!-- <div class="input_info">
          <div class="input_pirce">{{$t('Exchange.Price')}}(<span class="base-currency">{{exchange_from}}</span>)</div>
          <div class="input_num">{{$t('Exchange.BuyQty')}}(<span class="trade-currency">{{exchange_to}}</span>)</div>
          <div class="input_amount">{{$t('Exchange.Amount')}}(<span class="base-currency">{{exchange_from}}</span>)</div>
        </div> -->
        <div class="input_group">
          <div style="position:relative;display:flex;">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" @keydown="buy_active = 'price'"  type="tel" v-model.number="buy.price_type.price" :placeholder="$t('Exchange.PlaceholderMRPrice')">
          <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_to}}</div>
          </div>
          <div class="slider">
          <!-- <label>{{$t('Exchange.BuyPercent')}}</label> -->
          <div class="slider_bar">
            <vue-slider @drag-end="buy_price_type_percent_change"
                        tooltip="hover"
                        :clickable="false"
                        v-model="buy.price_type.percent"></vue-slider>
          </div>
          <label>{{buy.price_type.percent}}%</label>
        </div>
        <div style="position:relative;display:flex;">
           <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'OSC'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNum')">
           <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'DGC'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNumDGC')">
           <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'XDAG'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNumXDAG')">
            <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'FFT'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNumFFT')">
           <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'CBC'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNumCBC')">
             <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'ETH'" @keydown="buy_active = 'qty'" type="text" v-model.number="buy.price_type.qty" :placeholder="$t('Exchange.PlaceholderMRNumETH')">
          <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_from}}</div>
        </div>
         
          <div class="trade_suan_zone">
            <p>{{$t('Exchange.TradingVolume')}}<span><i class="red">{{buy.price_type.amount}}</i> FFC</span></p>
            <p>{{$t('Exchange.ServiceCharge')}}<span>{{buy.price_type.fee}}&nbsp;{{exchange_from}}</span></p>
            <!-- <p>{{$t('Exchange.FreeCharge')}}</p> -->
            <p>{{$t('Exchange.ActualAccount')}}<span>{{(buy.price_type.qty-buy.price_type.fee)>0?(buy.price_type.qty-buy.price_type.fee):'0'}}&nbsp;{{exchange_from}}</span></p>
          </div>
          <!-- <input @keydown="buy_active = 'amount'"  type="text" v-model.number="buy.price_type.amount"> -->
        </div>
        
      </div>
        <div class="market_limit" v-if="buy_type == 1">
          <div class="market_amount_input" style="position:relative">
            <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input"  @keydown="buy_active = 'amount'" :placeholder="$t('Exchange.PlaceholderFFC')" v-model.number="buy.market_type.amount">
            <!-- <div class="market_amount_crypto">{{exchange_to}}</div> -->
            <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_to}}</div>
          </div>
          <div class="slider">
            <!-- <label>{{$t('Exchange.BuyPercent')}}</label> -->
            <div class="slider_bar">
              <vue-slider @drag-end="buy_market_type_percent_change"
                          tooltip="hover"
                          :clickable="false"
                          v-model="buy.market_type.percent"></vue-slider>
            </div>
            <label>{{buy.market_type.percent}}%</label>
          </div>
        </div>
        <div class="payment_password_input">
          <input  class="trade_input" autocomplete="off" :placeholder="$t('Exchange.PaymentPassword')" type="password" v-model="buy.payment_password">
        </div>
        <div class="error_notice">{{buy.error_notice}}</div>
        <div class="btn" @click="buy_submit">
          {{$t('Exchange.Buy')}} 
        </div>
        <p style=" width: 100%;
            line-height: 2;
            font-size: 0.8em;
            height: auto;
            margin-top: 1em;
            color:#3d9cee;
            text-decoration:underline;
            text-align: left;
            margin-bottom: 0px;
            padding-bottom: 0px;
            cursor: pointer;
            padding-top: 0.3em;
            margin-top: 0em;"  @click="placeOrder(true)">{{$t('Exchange.BulkOrder')}}</p>
      </div>
            </el-col>
            <el-col :span="12">
              <div class="box sell">
      <div class="banlance">{{exchange_from}}{{$t('Exchange.Blance')}} <span>{{from_amount}}</span>
        <span class="recharge-btn">
          <router-link :to="{ name: 'WalletRechargeCurrency', params:{currency: exchange_from.toLowerCase()}}">
              {{$t('Exchange.RechargeBtn')}}
           </router-link>
        </span>
      </div>
       <el-radio v-model="sell_type" label="0">{{$t('Exchange.LimitOrder')}}</el-radio>
       <el-radio v-model="sell_type" label="1">{{$t('Exchange.MarketOrder')}}</el-radio>
      <!-- <select class="type_select" v-model="sell_type">
        <option value="0">{{$t('Exchange.LimitPrice')}}</option>
        <option value="1">{{$t('Exchange.MarketPrice')}}</option>
      </select> -->
      <div class="price_limit" v-if="sell_type == 0">
        <!-- <div class="input_info">
          <div class="input_pirce">{{$t('Exchange.Price')}}(<span class="base-currency">{{exchange_from}}</span>)</div>
          <div class="input_num">{{$t('Exchange.SellQty')}}(<span class="trade-currency">{{exchange_to}}</span>)</div>
          <div class="input_amount">{{$t('Exchange.Amount')}}(<span class="base-currency">{{exchange_from}}</span>)</div>
        </div> -->
        <div class="input_group">
          <div style="position:relative;display:flex">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input"  @keydown="sell_active = 'price'"  type="text" v-model.number="sell.price_type.price" :placeholder="$t('Exchange.PlaceholderMCPrice')">
          <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_to}}</div>
          </div>
          <div class="slider">
          <div class="slider_bar">
            <vue-slider @drag-end="sell_price_type_percent_change"
                        tooltip="hover"
                        :clickable="false"
                        v-model="sell.price_type.percent"></vue-slider>
          </div>
          <label>{{sell.price_type.percent}}%</label>
        </div>
        <div style="position: relative;display:flex">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'OSC'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNum')">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"  class="trade_input" v-show="this.exchange_from=== 'DGC'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNumDGC')">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="this.exchange_from=== 'XDAG'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNumXDAG')">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="this.exchange_from=== 'FFT'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNumFFT')">
           <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="this.exchange_from=== 'CBC'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNumCBC')">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="this.exchange_from=== 'ETH'" @keydown="sell_active = 'qty'" type="text" v-model.number="sell.price_type.qty" :placeholder="$t('Exchange.PlaceholderMCNumETH')">
          <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_from}}</div>
          </div>
          <div class="trade_suan_zone">
            <p>{{$t('Exchange.TradingVolume')}}<span><i class="red">{{sell.price_type.amount}}</i> FFC</span></p>
            <p>{{$t('Exchange.ServiceCharge')}}<span>{{sell.price_type.fee}}&nbsp;{{exchange_to}}</span></p>
             <!-- <p>{{$t('Exchange.FreeCharge')}}</p> -->
            <p>{{$t('Exchange.ActualAccount')}}<span>{{(sell.price_type.amount-sell.price_type.fee)>0?(sell.price_type.amount-sell.price_type.fee):0}}&nbsp;{{exchange_to}}</span></p>
          </div>
          <!-- <input @keydown="sell_active = 'amount'"  type="text" v-model.number="sell.price_type.amount"> -->
        </div>
        
      </div>
      <div class="market_limit" v-if="sell_type == 1">
        <div class="market_amount_input" style="position:relative;display:flex">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='OSC'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderOSC')"  v-model.number="sell.market_type.amount">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='DGC'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderDGC')"  v-model.number="sell.market_type.amount">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='XDAG'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderXDAG')"  v-model.number="sell.market_type.amount">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='FFT'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderFFT')"  v-model.number="sell.market_type.amount">
         <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='CBC'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderCBC')"  v-model.number="sell.market_type.amount">
          <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="trade_input" v-show="exchange_from=='ETH'" @keydown="sell_active = 'amount'" :placeholder="$t('Exchange.PlaceholderETH')"  v-model.number="sell.market_type.amount">
          <!-- <div class="market_amount_crypto">{{exchange_to}}</div> -->
          <div style="position: absolute;right:12px;top:17px;color:#bcc0d1;font-size:12px">{{exchange_from}}</div>
        </div>
        <div class="slider">
          <!-- <label>{{$t('Exchange.SellPercent')}}</label> -->
          <div class="slider_bar">
            <vue-slider @drag-end="sell_market_type_percent_change"
                        tooltip="hover"
                        :clickable="false"
                        v-model="sell.market_type.percent"></vue-slider>
          </div>
          <label>{{sell.market_type.percent}}%</label>
        </div>
      </div>
      <div class="payment_password_input">
        <input    class="trade_input" :placeholder="$t('Exchange.PaymentPassword')" type="password" v-model.trim="sell.payment_password">
      </div>
      <div class="error_notice">{{sell.error_notice}}</div>
      <div class="btn" @click="sell_submit">
        {{$t('Exchange.Sell')}} 
      </div>
       <p style=" width: 100%;
            line-height: 2;
            font-size: 0.8em;
            height: auto;
            margin-top: 1em;
            color:#3d9cee;
            text-decoration:underline;
            text-align: left;
            margin-bottom: 0px;
            padding-bottom: 0px;
            cursor: pointer;
            padding-top: 0.3em;
            margin-top: 0em;"  @click="placeOrder(false)" >{{$t('Exchange.BulkOrder')}}</p>
    </div>
            </el-col>
          </el-row>

        </div>

        </div>
    <div class="login_panel">
      <div class="modal">
      </div>
      <router-link :to="{ name: 'SignIn'}"
                   class="to_login"> 
       <span class="login_ft">{{$t('Exchange.login')}}</span>{{$t('Exchange.tradeTime')}} 
      </router-link>
    </div>



  <div class="mask" v-show="isBulkOrder">
    <div class="mask-window">
      <div class="close-zone"><i class="close-zone-btn" @click="closeMask"></i></div>
            <div class="input-zone">
            <p class="input-title">{{$t('Exchange.entrust_price')}}</p><!--{{$t('Trade.TradeLimit')}}-->
            <div class="input-content-zone">
                <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" type="text" :placeholder="$t('Exchange.entrust_price_hint')" v-model="entrust_price"  >
                <div class="currency_flag">{{this.exchange_to}}</div>
            </div>

            <p class="input-title">{{$t('Exchange.entrust_qty')}}</p>
            <div class="input-content-zone">
                <input  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" type="text" :placeholder="$t('Exchange.entrust_qty_hint')" v-model="entrust_qty"  >
                <div class="currency_flag">{{this.exchange_from}}</div>
            </div>

            <p class="input-title">{{$t('Exchange.entrust_interval_price')}}</p>
            <div class="input-content-zone">
                <input  type="text" :placeholder="$t('Exchange.entrust_interval_price_hint')" v-model="entrust_interval_price"  >
                <div class="currency_flag">{{this.exchange_to}}</div>
            </div>
            <p class="input-title">{{$t('Exchange.entrust_interval_qty')}}</p>
            <div class="input-content-zone">
                <input  type="text" :placeholder="$t('Exchange.entrust_interval_qty_hint')" v-model="entrust_interval_qty"  >
                <div class="currency_flag">{{this.exchange_from}}</div>
            </div>

            <p class="input-title">{{$t('Exchange.entrust_time')}}</p>
            <div class="input-content-zone">
                <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"   type="text" :placeholder="$t('Exchange.entrust_time_hint')" v-model="entrust_time"  >
            </div>
            <p class="input-title">{{$t('Exchange.AssertsPassword')}}</p>
            <div class="input-content-zone">
                <input  type="password" :placeholder="$t('Exchange.AssertsPasswordHint')"   v-model="passwordValue"  >
            </div>
             <div class="error_notice">{{bulk_order_error_notice}}</div>
            <button class="window-btn window-btn-buy"  @click="placeOrderBuy" :class="{disable:false}"  v-show="idBuyPlaceOrder" >{{$t('Exchange.BulkOrderBuy')}}</button>
            <button class="window-btn window-btn-sell" @click="placeOrderSell" :class="{disable:false}"  v-show="!idBuyPlaceOrder"  >{{$t('Exchange.BulkOrderSell')}}</button>
          </div> 
        </div>
      </div>


<div class="mask" v-show="isOrderListDetail">
  <div class="mask-window">
      <div class="close-zone"><i class="close-zone-btn" @click="closeMask"></i></div>
       <div class="input-zone">
            <table class="history-table" style="width:100%" >  
                <tbody>
                  <tr>
                    <td style="width:33.33%">序号</td>
                    <td style="width:33.33%">价格（{{exchange_to}}）</td>
                    <td style="width:33.33%">数量（{{exchange_from}}）</td>
                  </tr>
                </tbody>
            </table>
            <div style=" overflow-x: hidden; overflow-y: scroll;height: 400px;width:100%;" >
              <table class="history-table" style="width:100%" >  
                <tbody>
                    <tr v-for="(item) in this.h_order_pres" :key="item.index" >
                      <td style="width:33.33%;padding-left:5px;">{{item.index}}</td>  
                      <td style="width:33.33%;padding-left:12px;">{{item.price}}</td>
                      <td style="width:33.33%;padding-left:12px;">{{item.qty}}</td>
                    </tr>
                </tbody>
              </table>
            </div>
            <button class="window-btn window-btn-buy"  @click="placeOrdersBuy" :class="{disable:false}"  v-show="idBuyPlaceOrder" style="margin-top:30px;">{{$t('Exchange.BulkOrderBuy')}}</button>
            <button class="window-btn window-btn-sell" @click="placeOrdersSell" :class="{disable:false}"  v-show="!idBuyPlaceOrder"  style="margin-top:30px;" >{{$t('Exchange.BulkOrderSell')}}</button>       
       </div>
  </div> 
 </div>

  </div>
</template>
<script>
const TYPE_PRICE = "0";
const TYPE_MARKET = "1";

import lib from "../../../utils/lib";
import exchange from "../../../models/exchange";
import wallet from "../../../models/wallet";
import vueSlider from "vue-slider-component";

export default {
  name: "ExchangeTradeBox",
  components: { vueSlider },
  props: ["exchange_from", "exchange_to", "trade_price", "getBalance"],
  data() {
    return {
      is_login: false,
      from_amount: 0,
      to_amount: 0,
      // radio: '1',
      buy_type: TYPE_PRICE,
      buy_active: "",
      activeName2: "first",
      buy: {
        price_type: {
          price: "",
          qty: "",
          fee: "",
          amount: "",
          percent: 0
        },
        market_type: {
          amount: "",
          fee: "",
          percent: 0
        },
        payment_password: "",
        error_notice: ""
      },

      sell_type: TYPE_PRICE,
      sell_active: "",
      sell: {
        price_type: {
          price: "",
          qty: "",
          fee: "",
          amount: "",
          percent: 0
        },
        market_type: {
          amount: "",
          fee: "",
          percent: 0
        },
        payment_password: "",
        error_notice: ""
      },
      value1: 0,
      order_list: [],
      order_timer: null,
      balance_timer: null,
      prices: [0, 0],
      tradeFee: 0.002, //0.0015

      entrust_price: "",
      entrust_qty: "",
      entrust_interval_price: "",
      entrust_interval_qty: "",
      entrust_time: "",
      isPlaceOrder: false,
      isBulkOrder: false,
      idBuyPlaceOrder: true,
      passwordValue: "",
      bulk_order_error_notice: "",
      isStopPlaceOrder: false,
      isOrderListDetail: false,
      h_order_pres: []
    };
  },
  watch: {
    "buy.price_type.price": function(val) {
      if (this.buy_active !== "price") {
        return false;
      }
      let price = parseFloat(val);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let qty = parseFloat(this.buy.price_type.qty);
      if (qty <= 0 || isNaN(qty)) {
        return false;
      }

      let amount = lib.toFixed(price * qty, 2);
      let percent = parseInt(amount / this.to_amount * 100);
      this.buy.price_type.amount = amount;
      this.buy.price_type.fee = lib.toFixed(this.tradeFee * qty, 8);
      this.buy.price_type.percent = percent > 100 ? 100 : percent;
    },
    "buy.price_type.qty": function(val) {
      if (this.buy_active !== "qty") {
        return false;
      }

      let qty = parseFloat(val);
      if (qty <= 0 || isNaN(qty)) {
        return false;
      }

      let price = parseFloat(this.buy.price_type.price);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let amount = lib.toFixed(price * qty, 2);
      let percent = parseInt(amount / this.to_amount * 100);
      this.buy.price_type.amount = amount;
      this.buy.price_type.fee = lib.toFixed(this.tradeFee * qty, 8);
      this.buy.price_type.percent = percent;
    },
    "buy.price_type.amount": function(val) {
      if (this.buy_active !== "amount") {
        return false;
      }

      let amount = parseFloat(val);
      if (amount <= 0 || isNaN(amount)) {
        return false;
      }

      let percent = parseInt(amount / this.to_amount * 100);
      this.buy.price_type.percent = percent > 100 ? 100 : percent;

      let price = parseFloat(this.buy.price_type.price);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let qty = lib.toFixed(amount / price, 8);
      this.buy.price_type.qty = qty;
      this.buy.price_type.fee = lib.toFixed(this.tradeFee * qty, 8);
    },
    "buy.market_type.amount": function(val) {
      if (this.buy_active !== "amount") {
        return false;
      }

      this.buy_active = "";

      let amount = parseFloat(val);
      if (amount <= 0 || isNaN(amount)) {
        return false;
      }
      let percent = parseInt(amount / this.to_amount * 100);
      this.buy.market_type.percent = percent > 100 ? 100 : percent;
    },
    "sell.price_type.price": function(val) {
      if (this.sell_active !== "price") {
        return false;
      }
      let price = parseFloat(val);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let qty = parseFloat(this.sell.price_type.qty);
      if (qty <= 0 || isNaN(qty)) {
        return false;
      }

      let amount = lib.toFixed(price * qty, 2);
      this.sell.price_type.amount = amount;
      this.sell.price_type.fee = lib.toFixed(this.tradeFee * amount, 2);
    },
    "sell.price_type.qty": function(val) {
      if (this.sell_active !== "qty") {
        return false;
      }

      let qty = parseFloat(val);
      if (qty <= 0 || isNaN(qty)) {
        return false;
      }

      let percent = parseInt(qty / this.from_amount * 100);

      this.sell.price_type.percent = percent > 100 ? 100 : percent;

      let price = parseFloat(this.sell.price_type.price);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let amount = lib.toFixed(price * qty, 2);
      this.sell.price_type.amount = amount;
      this.sell.price_type.fee = lib.toFixed(this.tradeFee * amount, 2);
    },
    "sell.price_type.amount": function(val) {
      if (this.sell_active !== "amount") {
        return false;
      }

      let amount = parseFloat(val);
      if (amount <= 0 || isNaN(amount)) {
        return false;
      }

      let percent = parseInt(amount / this.from_amount * 100);
      this.sell.price_type.percent = percent > 100 ? 100 : percent;

      let price = parseFloat(this.sell.price_type.price);
      if (price <= 0 || isNaN(price)) {
        return false;
      }

      let qty = lib.toFixed(amount / price, 8);
      this.sell.price_type.qty = qty;
      this.sell.price_type.fee = lib.toFixed(this.tradeFee * amount, 2);
    },
    "sell.market_type.amount": function(val) {
      if (this.sell_active !== "amount") {
        return false;
      }

      let amount = parseFloat(val);
      if (amount <= 0 || isNaN(amount)) {
        return false;
      }
      let percent = parseInt(amount / this.from_amount * 100);
      this.sell.market_type.percent = percent > 100 ? 100 : percent;
      this.sell.price_type.fee = lib.toFixed(this.tradeFee * amount, 2);
    },
    exchange_from: function() {
      this.buy.price_type.fee = "";
      this.buy.price_type.price = "";
      this.buy.price_type.qty = "";
      this.buy.price_type.amount = "";
      this.buy.price_type.percent = 0;
      this.sell.price_type.fee = "";
      this.sell.price_type.price = "";
      this.sell.price_type.qty = "";
      this.sell.price_type.amount = "";
      this.bulk_order_error_notice = "";
      this.buy.error_notice = "";
      this.sell.error_notice = "";
      this.sell.price_type.percent = 0;
      this.prices[0] = 0;
      if (this.is_login) {
        this.from_amount = 0;
        this.to_amount = 0;
        this.reload_my_order();
        this.reload_balance();
      }
    },
    exchange_to: function() {
      this.prices[0] = 0;
      if (this.is_login) {
        this.from_amount = 0;
        this.to_amount = 0;
        this.reload_my_order();
        this.reload_balance();
      }
    },
    trade_price: function() {
      if (this.is_login) {
        if (this.prices[0] != 0) return;
        this.prices = this.trade_price.split("_");
        this.buy.price_type.price = this.prices[1];
        this.sell.price_type.price = this.prices[0];
      }
    },
    getBalance: function() {
      this.load_balance();
    }
  },
  created: function() {
    if (this.$store.state.user.access_token != "") {
      this.is_login = true;
      this.load_my_order();
      this.load_balance();
    }
  },
  beforeDestroy: function() {
    clearTimeout(this.order_timer);
    clearTimeout(this.balance_timer);
  },
  methods: {
    placeOrderBuy() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_price_hint");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_qty_hint");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.bulk_order_error_notice = this.$t(
          "Exchange.entrust_interval_price_hint"
        );
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.bulk_order_error_notice = this.$t(
          "Exchange.entrust_interval_qty_hint"
        );
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_time_hint");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.bulk_order_error_notice = this.$t("Exchange.BulkTimeError");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.bulk_order_error_notice = this.$t("Exchange.OrderError");
        return;
      }
      if (this.passwordValue === "") {
        this.bulk_order_error_notice = this.$t("Exchange.AssertsPasswordHint");
        return;
      }
      this.isPlaceOrder = false;
      this.isStopPlaceOrder = false;
      // this.isTrading = true;
      this.isBulkOrder = false;
      var l_this = this;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      // var m_currency_to_currency = this.exchange_from + "_" + this.exchange_to;
      this.h_order_pres = [];
      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isOrderListDetail = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isOrderListDetail = true;

      // for (var i = 0; i < m_entrust_time; i++) {
      //   setTimeout(() => {
      //     l_this.orderBuy(
      //       m_currency_to_currency,
      //       m_entrust_price,
      //       m_entrust_qty,
      //       i + 1,
      //       m_entrust_time
      //     );
      //     m_entrust_price = m_entrust_price + m_entrust_interval_price;
      //     m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      //   }, i * 500);
      // }
    },
    placeOrdersBuy() {
      var l_this = this;
      this.isOrderListDetail = false;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.exchange_from + "_" + this.exchange_to;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderBuy(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    placeOrderSell() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_price_hint");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_qty_hint");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.bulk_order_error_notice = this.$t(
          "Exchange.entrust_interval_price_hint"
        );
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.bulk_order_error_notice = this.$t(
          "Exchange.entrust_interval_qty_hint"
        );
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.bulk_order_error_notice = this.$t("Exchange.entrust_time_hint");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.bulk_order_error_notice = this.$t("Exchange.BulkTimeError");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.bulk_order_error_notice = this.$t("Exchange.OrderError");
        return;
      }
      if (this.passwordValue === "") {
        this.bulk_order_error_notice = this.$t("Exchange.AssertsPasswordHint");
        return;
      }
      this.isPlaceOrder = false;
      this.isBulkOrder = false;
      var l_this = this;
      this.isStopPlaceOrder = false;
      this.h_order_pres = [];
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isOrderListDetail = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isOrderListDetail = true;
    },
    placeOrdersSell() {
      var l_this = this;
      this.isStopPlaceOrder = false;
      this.isOrderListDetail = false;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.exchange_from + "_" + this.exchange_to;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderSell(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    orderBuy(m_currency_to_currency, price, qty, time1, time2) {
      if (price <= 0 || qty <= 0) return;
      if (this.isStopPlaceOrder) return;
      exchange
        .limitOrder(
          m_currency_to_currency,
          qty,
          price,
          true,
          this.passwordValue
        )
        .then(data => {
          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          if (time1 == time2) {
            setTimeout(() => {
              this.reload_my_order();
              this.reload_balance();
            }, 300);
          }
        })
        .catch(e => {
          this.isStopPlaceOrder = true;
          switch (e.code) {
            case 1023:
              this.bulk_order_error_notice = this.$t(
                "Validate.PaymentPwdError"
              );
              break;
            case 1113:
              this.bulk_order_error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.passwordValue = "";
        });
    },
    orderSell(m_currency_to_currency, price, qty, time1, time2) {
      if (price <= 0 || qty <= 0) return;
      if (this.isStopPlaceOrder) return;
      // console.log(new Date().getTime()+"  time");
      exchange
        .limitOrder(
          m_currency_to_currency,
          qty,
          price,
          false,
          this.passwordValue
        )
        .then(data => {
          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          if (time1 == time2) {
            setTimeout(() => {
              this.reload_my_order();
              this.reload_balance();
            }, 300);
          }
        })
        .catch(e => {
          this.isStopPlaceOrder = true;
          switch (e.code) {
            case 1023:
              this.bulk_order_error_notice = this.$t(
                "Validate.PaymentPwdError"
              );
              break;
            case 1113:
              this.bulk_order_error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.passwordValue = "";
        });
    },
    placeOrder(val) {
      this.idBuyPlaceOrder = val;
      this.passwordValue = "";
      this.isBulkOrder = true;
    },
    closeMask() {
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      this.passwordValue = "";
      this.isBulkOrder = false;
      this.isOrderListDetail = false;
    },
    buy_price_type_percent_change: function() {
      // console.log('buy_price_type_percent_change'+ this.buy.price_type.percent )
      let p = this.buy.price_type.percent;
      this.buy_active = "qty";
      this.buy.price_type.amount = parseFloat(
        lib.toFixed(this.to_amount * this.buy.price_type.percent * 0.01, 8)
      );
      this.buy.price_type.qty = parseFloat(
        lib.toFixed(this.buy.price_type.amount / this.buy.price_type.price, 8)
      );
      this.buy.price_type.percent = p;
    },
    buy_market_type_percent_change: function() {
      // console.log('buy_market_type_percent_change')
      this.buy_active = "amount";
      this.buy.market_type.amount = parseFloat(
        lib.toFixed(this.to_amount * this.buy.market_type.percent * 0.01, 8)
      );
    },
    sell_price_type_percent_change: function() {
      this.sell_active = "qty";
      this.sell.price_type.qty = parseFloat(
        lib.toFixed(this.from_amount * this.sell.price_type.percent * 0.01, 8)
      );
    },
    sell_market_type_percent_change: function() {
      this.sell_active = "amount";
      this.sell.market_type.amount = parseFloat(
        lib.toFixed(this.from_amount * this.sell.market_type.percent * 0.01, 8)
      );
      // this.sell.price_type.fee = lib.toFixed(0.0015 * amount,2)
    },
    check_in_page: function() {
      if (this.$route.name != "Exchange") {
        return false;
      }
      return true;
    },
    buy_submit: function() {
      this.buy.error_notice = "";
      switch (true) {
        case this.buy_type == TYPE_PRICE:
          this.buy_price_type();
          break;
        case this.buy_type == TYPE_MARKET:
          this.buy_market_type();
          break;
      }
    },
    buy_price_type: function() {
      //check
      let qty = parseFloat(this.buy.price_type.qty);
      if (qty <= 0 || isNaN(qty)) {
        this.buy.error_notice = this.$t("Exchange.QtyError");
        return false;
      }

      let price = parseFloat(this.buy.price_type.price);
      if (price <= 0 || isNaN(price)) {
        this.buy.error_notice = this.$t("Exchange.PriceError");
        return false;
      }

      if (this.buy.payment_password.length == 0) {
        this.buy.error_notice = this.$t("Exchange.PwdEmpty");
        return false;
      }
      if (
        parseFloat(this.buy.price_type.qty) *
          parseFloat(this.buy.price_type.price) <
        20
      ) {
        this.buy.error_notice = "订单不足 20 FFC";
        return false;
      }
      exchange
        .limitOrder(
          this.exchange_from + "_" + this.exchange_to,
          this.buy.price_type.qty,
          this.buy.price_type.price,
          true,
          this.buy.payment_password
        )
        .then(data => {
          this.buy.payment_password = "";
          this.buy.price_type.price = "";
          this.buy.price_type.qty = "";
          this.buy.price_type.percent = 0;
          this.buy.price_type.amount = 0;
          this.prices[0] = 0;
          this.$notify({
            title: this.$t("Exchange.SuccessTile"),
            message: this.$t("Exchange.SuccessMsg"),
            duration: 1000
          });

          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          setTimeout(() => {
            this.reload_my_order();
            this.reload_balance();
          }, 300);
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.buy.error_notice = this.$t("Validate.PaymentPwdError");
              break;
            case 1113:
              this.buy.error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.buy.payment_password = "";
        });
    },
    buy_market_type: function() {
      //check
      let amount = parseFloat(this.buy.market_type.amount);
      if (amount <= 0 || isNaN(amount)) {
        this.buy.error_notice = this.$t("Exchange.AmountError");
        return false;
      }

      if (this.buy.payment_password.length == 0) {
        this.buy.error_notice = this.$t("Exchange.PwdEmpty");
        return false;
      }
      if (parseFloat(this.buy.market_type.amount) < 20) {
        this.buy.error_notice = "订单不足 20 FFC";
        return false;
      }

      exchange
        .marketOrder(
          this.exchange_from + "_" + this.exchange_to,
          this.buy.market_type.amount,
          true,
          this.buy.payment_password
        )
        .then(data => {
          this.buy.payment_password = "";
          this.buy.market_type.amount = "";
          this.$notify({
            title: this.$t("Exchange.SuccessTile"),
            message: this.$t("Exchange.SuccessMsg"),
            duration: 1000
          });
          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          setTimeout(() => {
            this.reload_my_order();
            this.reload_balance();
          }, 300);
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.buy.error_notice = this.$t("Validate.PaymentPwdError");
              break;
            case 1113:
              this.buy.error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.buy.payment_password = "";
        });
    },
    sell_submit: function() {
      this.sell.error_notice = "";
      switch (true) {
        case this.sell_type == TYPE_PRICE:
          this.sell_price_type();
          break;
        case this.sell_type == TYPE_MARKET:
          this.sell_market_type();
          break;
      }
    },
    sell_price_type: function() {
      //check
      let qty = parseFloat(this.sell.price_type.qty);
      if (qty <= 0 || isNaN(qty)) {
        this.sell.error_notice = this.$t("Exchange.QtyError");
        return false;
      }

      let price = parseFloat(this.sell.price_type.price);
      if (price <= 0 || isNaN(price)) {
        this.sell.error_notice = this.$t("Exchange.PriceError");
        return false;
      }
      if ("DGC_FFC" == this.exchange_from + "_" + this.exchange_to)
        if (parseFloat(this.sell.price_type.qty) < 100) {
          this.sell.error_notice = "出售数量最少 100 DGC";
          return false;
        }
      if ("OSC_FFC" == this.exchange_from + "_" + this.exchange_to)
        if (parseFloat(this.sell.price_type.qty) < 10) {
          this.sell.error_notice = "出售数量最少 10 OSC";
          return false;
        }
      if ("FFT_FFC" == this.exchange_from + "_" + this.exchange_to)
        if (parseFloat(this.sell.price_type.qty) < 10) {
          this.sell.error_notice = "出售数量最少 10 FFT";
          return false;
        }
      if ("ETH_FFC" == this.exchange_from + "_" + this.exchange_to)
        if (parseFloat(this.sell.price_type.qty) < 0.005) {
          this.sell.error_notice = "出售数量最少 0.005 ETH";
          return false;
        }
      if (this.sell.payment_password.length == 0) {
        this.sell.error_notice = this.$t("Exchange.PwdEmpty");
      }
      if ("CBC_FFC" == this.exchange_from + "_" + this.exchange_to)
        if (parseFloat(this.sell.price_type.qty) < 100) {
          this.sell.error_notice = "出售数量最少 100 CBC";
          return false;
        }
      exchange
        .limitOrder(
          this.exchange_from + "_" + this.exchange_to,
          this.sell.price_type.qty,
          this.sell.price_type.price,
          false,
          this.sell.payment_password
        )
        .then(data => {
          this.sell.payment_password = "";
          this.sell.price_type.price = "";
          this.sell.price_type.qty = "";
          this.sell.price_type.percent = 0;
          this.sell.price_type.amount = 0;
          this.prices[0] = 0;
          this.$notify({
            title: this.$t("Exchange.SuccessTile"),
            message: this.$t("Exchange.SuccessMsg"),
            duration: 1000
          });

          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          setTimeout(() => {
            this.reload_my_order();
            this.reload_balance();
          }, 300);
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.sell.error_notice = this.$t("Validate.PaymentPwdError");
              break;
            case 1113:
              this.sell.error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.sell.payment_password = "";
        });
    },
    sell_market_type: function() {
      //check
      let amount = parseFloat(this.sell.market_type.amount);
      if (amount <= 0 || isNaN(amount)) {
        this.sell.error_notice = this.$t("Exchange.AmountError");
        return false;
      }

      if (this.sell.payment_password.length == 0) {
        this.sell.error_notice = this.$t("Exchange.PwdEmpty");
      }

      exchange
        .marketOrder(
          this.exchange_from + "_" + this.exchange_to,
          this.sell.market_type.amount,
          false,
          this.sell.payment_password
        )
        .then(data => {
          this.sell.payment_password = "";
          this.$notify({
            title: this.$t("Exchange.SuccessTile"),
            message: this.$t("Exchange.SuccessMsg"),
            duration: 1000
          });

          clearTimeout(this.order_timer);
          clearTimeout(this.balance_timer);
          setTimeout(() => {
            // this.reload_my_order()
            this.reload_balance();
          }, 300);
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.sell.error_notice = this.$t("Validate.PaymentPwdError");
              break;
            case 1113:
              this.sell.error_notice = this.$t("Validate.DuringFFTShare");
              break;
          }
          this.sell.payment_password = "";
        });
    },
    load_my_order: function() {
      // clearTimeout(this.order_timer)
      // exchange.myTradingOrder(this.exchange_from +'_'+this.exchange_to, 0, 5).then((data) => {
      //   if(!this.check_in_page()){
      //     return false
      //   }
      //   this.order_list = data.data.orders
      //   this.order_timer = setTimeout(this.load_my_order, 5000)
      // }).catch(() => {
      //   if(!this.check_in_page()){
      //     return false
      //   }
      //   this.order_timer = setTimeout(this.load_my_order, 5000)
      // })
    },
    load_balance: function() {
      clearTimeout(this.balance_timer);
      if ("Exchange" != this.$route.name) return;
      wallet
        .balance()
        .then(data => {
          if (!this.check_in_page()) {
            return false;
          }
          let list = data.data.list;

          for (let i = 0; i < list.length; i++) {
            if (list[i].currency == this.exchange_from) {
              this.from_amount = list[i].available;
            }

            if (list[i].currency == this.exchange_to) {
              this.to_amount = list[i].available;
            }
          }
          this.balance_timer = setTimeout(this.load_my_order, 5000);
        })
        .catch(() => {
          if (!this.check_in_page()) {
            return false;
          }
          this.balance_timer = setTimeout(this.load_my_order, 5000);
        });
    },
    reload_my_order: function() {
      clearTimeout(this.order_timer);
      this.load_my_order();
    },
    reload_balance: function() {
      clearTimeout(this.balance_timer);
      this.load_balance();
    },
    cancel: function(id) {
      clearTimeout(this.order_timer);
      clearTimeout(this.balance_timer);
      exchange
        .cancel(this.exchange_from + "_" + this.exchange_to, id)
        .then(data => {
          setTimeout(() => {
            this.reload_my_order();
            this.reload_balance();
          }, 300);
        })
        .catch(() => {});
    },
    set_sell_price: function(price) {
      this.sell_active = "price";
      this.sell.price_type.price = price;
      this.buy.price_type.price = price;
    },
    set_buy_price: function(price) {
      this.buy_active = "price";
      this.buy.price_type.price = price;
      this.sell.price_type.price = price;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/exchange2/TradeBox.scss";
</style>