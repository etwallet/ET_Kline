<template>
  <div>
    <div v-if="access_token!==''">
      <div class="login_top">
        <div class="login_top_item name">
          <router-link :to="{ name: 'UserInfo'}" class="login_top_link">
            <span>{{name}}<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i></span>
            <ul class="menu_list">
              <li class="men u_item"><router-link :to="{ name: 'UserInfo'}" class="login_top_link">
                <span class="user">{{$t('Top.LoginTop.User')}}</span>
              </router-link></li>
               <!-- <li class="men u_item"><router-link :to="{ name: 'Business'}" class="login_top_link">
                <span class="user">{{$t('Top.LoginTop.Business')}}</span>
              </router-link></li> -->
              <li class="menu_item" @click="signOut">{{$t('Top.LoginTop.SignOut')}}</li>
            </ul>
          </router-link>
        </div>
        <div class="login_top_item">
          <router-link :to="{ name: 'MarketSell'}" class="login_top_link">
            <i class="icon iconfont icon-msnui-ad"></i><span class="wallet">{{$t('Top.LoginTop.Market')}}</span>
          </router-link>
        </div>
        <div class="login_top_item">
          <router-link :to="{ name: 'WalletBalance'}"
                       class="login_top_link">
            <i class="icon iconfont icon-qianbao"></i><span class="wallet">{{$t('Top.LoginTop.Wallet')}}</span>
          </router-link>
        </div>
        <div class="login_top_item">
          <router-link :to="{ name: 'OrderProcessing'}"
                       class="login_top_link">
            <i class="icon iconfont icon-wendang"></i><span class="order">{{$t('Top.LoginTop.Order')}}</span>
            <i  v-show="isHasOrderTip" class="order-dian"></i>
          </router-link>
           <i  v-show="isHasOrderTip&&isClose" class="order-hint">
              {{$t('Top.LoginTop.Orderhint')}}<span @click="close">X</span></i>
        </div>
      </div>
      <!--<el-row class="login_top">-->
        <!--<el-col :span="4" :offset="6" class="login_top_item">-->
          <!--<router-link :to="{ name: 'OrderProcessing'}"-->
                       <!--class="login_top_link">-->
            <!--<i class="icon iconfont icon-wendang"></i><span class="order">{{$t('Top.LoginTop.Order')}}</span>-->
          <!--</router-link>-->
        <!--</el-col>-->
        <!--<el-col :span="4" class="login_top_item">-->
          <!--<router-link :to="{ name: 'WalletBalance'}"-->
                       <!--class="login_top_link">-->
            <!--<i class="icon iconfont icon-qianbao"></i><span class="wallet">{{$t('Top.LoginTop.Wallet')}}</span>-->
          <!--</router-link>-->
        <!--</el-col>-->
        <!--<el-col :span="8" class="login_top_item name">-->
          <!--<router-link :to="{ name: 'Index'}" class="login_top_link">-->
            <!--<span>{{name}}<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i></span>-->
            <!--<ul class="menu_list">-->
              <!--<li class="menu_item"><router-link :to="{ name: 'UserInfo'}" class="login_top_link">-->
                <!--<span class="user">{{$t('Top.LoginTop.User')}}</span>-->
              <!--</router-link></li>-->
              <!--<li class="menu_item">-->
                <!--<router-link :to="{ name: 'MarketBuy'}" class="login_top_link">-->
               <!--<span class="wallet">{{$t('Top.LoginTop.Market')}}</span>-->
              <!--</router-link></li>-->
              <!--<li class="menu_item" @click="signOut">{{$t('Top.LoginTop.SignOut')}}</li>-->
            <!--</ul>-->
          <!--</router-link>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </div>
    <div v-else>
      <div class="login_top">
        <div class="login_top_item">
          <router-link :to="{ name: 'SignUp'}"
                       class="login_top_link">
            <i class="icon_register"></i>{{ $t("Top.LoginTop.SignUp") }}
          </router-link>
        </div>
        <div class="login_top_item">
          <router-link :to="{ name: 'SignIn'}"
                       class="login_top_link">
             <i class="icon_login"></i>{{ $t("Top.LoginTop.SignIn") }}
          </router-link>
        </div>

      </div>
      <!--<el-row :gutter="20" class="login_top">-->
        <!--<el-col :span="6" :offset="12" class="login_top_item">-->
          <!--<router-link :to="{ name: 'SignIn'}"-->
                       <!--class="login_top_link">-->
            <!--{{ $t("Top.LoginTop.SignIn") }}-->
          <!--</router-link>-->
        <!--</el-col>-->
        <!--<el-col :span="6" class="login_top_item">-->
          <!--<router-link :to="{ name: 'SignUp'}"-->
                       <!--class="login_top_link">-->
            <!--{{ $t("Top.LoginTop.SignUp") }}-->
          <!--</router-link>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import user from '../../models/user'

  export default {
    name: 'ExchangeLoginTop',
    props:{
      isHasOrderTip:Boolean
    },
    data () {
      return {
        isClose:true
      }
    },
    computed: {
      ...mapState({
        name: state => state.user.name,
        access_token: state => state.user.access_token
      })
    },
    methods: {
      signOut: function () {
        user.signOut().then(() => {
          window.location.href = '/'
        }).catch(() => {

        })
      },
      close: function ()  {
        this.isClose = false
      }
    },
    created: function () {

    },
    mounted: function () {
      
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/exchangetop/LoginTop.scss";
</style>