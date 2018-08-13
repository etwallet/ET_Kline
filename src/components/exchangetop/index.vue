<template>
  <div class="top-zone">
    <el-row class="top">
      <el-col :span="5" xl="2"><ExchangeLogo></ExchangeLogo></el-col>
      <el-col :span="10" xl="12"><ExchangeNavBar></ExchangeNavBar></el-col>
      <el-col :span="9" xl="11"><ExchangeLoginTop :isHasOrderTip="isHasOrder"></ExchangeLoginTop></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <!-- <div class="today-trend-zone">
      <div class="today-trend">
        <span class="green">BTC：¥ 88798.30<i class="up"></i> </span>             
        <span >LTC：¥ 1755.65 </span>          
        <span class="orange">OSC：¥ 17906.34<i class="down"></i></span>              
        <span class="orange">ETH：¥ 4583.71<i class="down"></i></span> 
      </div>
    </div> -->
  </div>
</template>
<script>
  import ExchangeLogo from './Logo'
  import ExchangeNavBar from './NavBar'
  import ExchangeLoginTop from './LoginTop'
  export default {
    name: 'ExchangeTop',
    props:{
      isHasOrder:Boolean
    },
    components: {ExchangeLogo, ExchangeNavBar, ExchangeLoginTop},
    data () {
      return {

      }
    },
    created: function () {

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/Top2.scss";
</style>