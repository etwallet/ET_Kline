<template>
  <div class="processing">
    <div class="title">{{$t('SideBar.Prcessing')}}
      <!--<div @click="open" class="btn" v-show="!table_show">{{$t('User.Security.Open')}}</div>-->
      <!--<div @click="close" class="btn" v-show="table_show">{{$t('User.Security.Fold')}}</div>-->
      <div class="btn" :class="{active:is_refreshing}" @click="load"><i class=" icon iconfont icon-refresh"></i></div>
    </div>
    <div class="divider"></div>
    <div class="table" :class="{open:table_show}">
      <table>
        <thead>
        <th>{{$t('Processing.Table.Order')}}</th>
        <th>{{$t('Processing.Table.Type')}}</th>
        <th>{{$t('Processing.Table.Price')}}</th>
        <th>{{$t('Processing.Table.Qty')}}</th>
        <th>{{$t('Processing.Table.CreatedAt')}}</th>
        <th>{{$t('Processing.Table.Status')}}</th>
        <th>{{$t('Processing.Table.Manage')}}</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td><router-link :to="{path:'/order/detail/' + (item.is_buy?'buy':'sell') + '/'+ item.crypto_currency.toLowerCase() + '/' + item.id}" class="login_top_link">
            {{item.disp_id}}
          </router-link></td>
          <td v-if="item.is_buy">{{$t('Processing.Table.TypeBuy')}}</td>
          <td v-else>{{$t('Processing.Table.TypeSell')}}</td>
          <td>{{item.amount}} {{item.trade_currency}}</td>
          <td>{{item.qty}} {{item.crypto_currency}}</td>
          <td>{{getHumanDate(item.created)}}</td>
          <td>{{$t('Status.'+item.status)}}</td>
          <td class="manage">
            <a v-if="item.is_buy === true" @click="cancel(item.id, item.crypto_currency, index)">{{$t('Processing.Table.ManageCancel')}}</a>
            <a v-if="item.is_buy === true && item.status === 'TAKEN'" @click="paid(item.id, item.crypto_currency, index)">{{$t('Processing.Table.ManagePay')}}</a>
            <a v-if="item.is_buy === false" @click="release_dialog(item.id, item.crypto_currency, index)">{{$t('Processing.Table.ManagePayCoin')}}</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-dialog :title="$t('Processing.Dialog.PaidCoinTitle')" :visible.sync="payment_password_dialog" size="tiny" @close="dialog_close()">
      <div class="input_group">
        <div class="pwd_label">{{$t('Processing.Dialog.PaidPaymentPwd')}}</div>
        <el-input v-model="form.payment_pwd"  class="pwd_input" auto-complete="off"  type="password" @focus="pwd_error = ''" @keyup.native.enter="release(dialog.id, dialog.crypto_currency, dialog.index)" >
        </el-input>
        <div class="pwd_error">{{pwd_error}}</div>
      </div>
      <div class="release_notice">{{$t('Processing.Dialog.PaidCoinNotice')}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="payment_password_dialog = false" >{{$t('Processing.Dialog.Cancel')}}</el-button>
        <el-button type="primary" @click="release(dialog.id, dialog.crypto_currency, dialog.index)">{{$t('Processing.Dialog.Confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import moment from '../../utils/moment'
  import order from '../../models/order'
  import Subject from '../subject'
  export default {
    name: 'Processing',
    components: {Subject},
    data () {
      return {
        is_refreshing: false,
        table_show: true,
        is_trading: true,
        pre_page:3,
        current_page:1,
        list:[],
        payment_password_dialog: false,
        form: {
          payment_pwd: ''
        },
        dialog: {
          id: 0,
          crypto_currency: 0,
          index: 0
        },
        pwd_error: ''
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      getHumanDate: function (timestamp) {
        return moment(timestamp).format('YYYY/MM/DD HH:mm')
      },
      load: function () {
        this.is_refreshing = true
        order.list(this.is_trading, 0, this.pre_page).then(result => {
          let list = []
          this.list = result.data.trades
          this.table_show = true
          setTimeout(()=> {
            this.is_refreshing = false
          },1000)
        }).catch(function () {
          // TODO 异常处理
        });
      },
      open: function () {
        this.load()
      },
      close: function () {
        this.table_show = false
      },
      paid: function (id, crypto_currency, index) {
        this.$confirm(this.$t('Processing.Dialog.PaidContent'), this.$t('Processing.Dialog.PaidTitle'), {
          confirmButtonText: this.$t('Processing.Dialog.Confirm'),
          cancelButtonText: this.$t('Processing.Dialog.Cancel'),
          type: 'warning'
        }).then(() => {
          order.paid(id, crypto_currency).then(result => {
            let code = parseInt(result.code);
            if(code == 0){
              Vue.set(this.list, index, result.data.trade)
              this.$notify.success({
                title: this.$t('Processing.Dialog.PaidSuccessTitle'),
                message: this.$t('Processing.Dialog.PaidSuccessContent'),
                duration: 2000
              })
            }
          }).catch(() => {

          })
        }).catch(() => {

        });
      },
      cancel: function (id, crypto_currency, index) {
        this.$confirm(
          this.$createElement('p', null,
            [
              this.$createElement('p',null,this.$t('Order.DetailBuy.Dialog.CancelContent1')),
              this.$createElement('p',null,this.$t('Order.DetailBuy.Dialog.CancelContent2')),
              this.$createElement('p',null,this.$t('Order.DetailBuy.Dialog.CancelContent3'))
            ]),
          this.$t('Order.DetailBuy.Dialog.CancelTitle'),
          {
            confirmButtonText: this.$t('Processing.Dialog.Confirm'),
            cancelButtonText: this.$t('Processing.Dialog.Cancel'),
            type: 'error'
          }).then(() => {
          order.cancel(id, crypto_currency).then(result => {
            let code = parseInt(result.code);
            if(code == 0){
              Vue.delete(this.list, index)
              this.$notify.success({
                title: this.$t('Processing.Dialog.CancelSuccessTitle'),
                message: this.$t('Processing.Dialog.CancelSuccessContent'),
                duration: 2000
              })
            }
          }).catch(() => {

          })
        }).catch(() => {

        });
      },
      release_dialog: function (id, crypto_currency, index) {
        this.dialog.id = id
        this.dialog.crypto_currency = crypto_currency
        this.dialog.index = index
        this.payment_password_dialog = true
      },
      release: function (id, crypto_currency, index) {
        order.release(id, crypto_currency, this.form.payment_pwd).then(result => {
          let code = parseInt(result.code);
          if(code == 0){
            Vue.delete(this.list, index)
            this.payment_password_dialog = false
            this.form.payment_pwd = ''
            this.$notify.success({
              title: this.$t('Processing.Dialog.PaidCoinSuccessTitle'),
              message: this.$t('Processing.Dialog.PaidCoinSuccessContent'),
              duration: 2000
            })
          }
        }).catch((e) => {
          switch (e.code) {
            case 1023:
              this.pwd_error = this.$t('Validate.PaymentPwdError')
              break;
          }
        })
      },
      dialog_close: function () {
        this.form.payment_pwd = ''
        this.pwd_error = ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/Processing.scss";
</style>