<template>
  <div class="bottom">
    <div class="site_map">
      <div class="site_map_left">
        友情链接：      
        <a  href="https://www.jinse.com/" target="_blank">金色财经</a>
        <a  href="http://www.bishijie.com/kuaixun/" target="_blank">币世界</a>
        <a  href="https://eos.io/" target="_blank">eosio</a>
        <a  href="http://eosgravity.com/" target="_blank">EOS引力区</a>
        <a  href="http://eostoken.im/" target="_blank">EosToken</a>
        <a  href="https://eostracker.io/" target="_blank">eostracker.io</a>
        <a  href="https://eosmonitor.io/" target="_blank">eosmonitor.io</a>
        <a  href="http://www.firefoxotc.com" target="_blank"  v-show="false">火狐狸</a>
      </div>
      
    </div>
    <div class="site_map">
      <div class="site_map_left">
             
         <a href="https://twitter.com/TokenEos" target="_blank" ><img src="../../assets/images/exchange/a1.png">  </a>
         <a href="https://github.com/eostoken/ET-exchange/blob/master/WhitePaper.md" target="_blank" ><img src="../../assets/images/exchange/a2.png">  </a>
         <a href="https://www.facebook.com/eostokens" target="_blank"  ><img src="../../assets/images/exchange/a3.png">  </a>
         <a href="https://t.me/etex_official" target="_blank"  ><img src="../../assets/images/exchange/a4.png">  </a>
         <a href="https://github.com/eostoken/ET-exchange" target="_blank"  ><img src="../../assets/images/exchange/a5.png">  </a>
         <!-- <a ><img src="../../assets/images/exchange/a6.png"></a> -->
       
       
      </div>
      
    </div>

  </div>
</template>
<script>
import storage from "../../models/storage";
export default {
  name: "Bottom",
  components: {},
  data() {
    return {
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
      language: this.$locale.current()
    };
  },
  created: function() {},
  methods: {
    language_change: function() {
      this.$locale.change(this.language);
      storage.set("lang", this.language);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/Bottom.scss";
</style>