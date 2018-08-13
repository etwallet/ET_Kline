<template>
  <div class="top-zone">
     <div class="top">
       <Logo  style="float:left"></Logo>
       <div style="display:flex;margin-right:0px;float:right" v-show="false">
          <div class="div-right">
            <div style="position: relative;display:flex; margin-top:8px;">
                    <input   class="trade_input" @keydown="search" type="text" v-model="keyWord" placeholder="输入账号搜索交易记录"  @input="search"> 
                    <i class="search_btn" style="position: absolute;left:12px;top:7px;"></i>
            </div>
          </div>
          <button class="btn-search" v-show="false">搜索</button>
        </div>
     </div> 
  </div>
</template>
<script>
import Logo from "./Logo";
import NavBar from "./NavBar";
import LoginTop from "./LoginTop";
export default {
  name: "Top",
  props: {
    isHasOrder: Boolean
  },
  components: { Logo, NavBar, LoginTop },
  data() {
    return {
      keyWord: ""
    };
  },
  created: function() {},
  methods: {
    search() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/Top.scss";
</style>