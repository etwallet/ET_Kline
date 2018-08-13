<template>
  <div style="position:relative">
    <el-row :gutter="24" class="navbar2">
      <el-col :span="4" class="nav_item2">
        <router-link :to="{ name: 'Index'}"
                     class="item_link">
          {{ $t("Top.NavBar.HomePage") }}
        </router-link>
      </el-col>
      <el-col :span="5" class="nav_item2">
        <router-link :to="{ name: 'Trade'}"
                     class="item_link">
          {{ $t("Top.NavBar.TradingCenter") }}
        </router-link>
      </el-col>
      <el-col :span="5" class="nav_item2">
        <router-link :to="{ name: 'Exchange'}"
                     class="item_link">
          {{ $t("Top.NavBar.Exchange") }}
        </router-link>
        <div class="hot-hint"></div>


      </el-col>
      <!-- <el-col :span="4" class="nav_item">
        <router-link :to="{ name: 'BaiKe'}"
                     class="item_link">
         百科
        </router-link>
      </el-col> -->
      <!-- <el-col :span="5" class="nav_item">
        <router-link :to="{ name:'Publish'}"
                     class="item_link">
          {{ $t("Top.NavBar.PublishingTransaction") }}
        </router-link>
      </el-col> -->
      <el-col :span="5" class="nav_item2">
        <router-link :to="{ name:'Invite'}"
                     class="item_link">
          {{ $t("Top.NavBar.PromotionIncome") }}
        </router-link>
      </el-col>
      <el-col :span="5" class="nav_item2">
        <a class="item_link_last" @mouseenter="showapp" >
          {{ $t("Top.NavBar.download") }}
          <i></i>
          <div class="app_qrcode" v-show="isShow"  @mouseleave="hideapp">
            <div class="app_qrcode_zone">
              <div v-show="!isIos" class="app_qrcode_img">
              </div>
              <div v-show="isIos" class="app_qrcode_img_ios"></div>
              <div class="app_font">
                <a class="andFont" :class="{AppActive:!isIos}" @click="btnisand"><i class="and-ico" :class="{andActive:isIos}"></i>Android</a>
                <a class="iosFont" :class="{AppActive:isIos}" @click="btnisios"><i class="ios-ico" :class="{iosActive:isIos}"></i>IOS</a>
              </div>
            </div>
          </div>
        </a>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
  export default {
    name: 'ExchangeNavBar',
    data () {
      return {
       isShow:false,
       isIos:false,
      }
    },
    created: function () {

    },
     methods: {
       btnisand:function(){
         this.isIos=false
       },
       btnisios:function(){
          this.isIos=true
       },
      showapp: function () {
        this.isShow=true
      },
      hideapp:function () {
        this.isShow=false
      }
    }
  }
</script>
<style lang="scss" scope>
@import "../../assets/css/exchangetop/NavBar.scss";
</style>