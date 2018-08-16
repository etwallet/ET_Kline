<template>
  <div class="bottom">
    <div class="site_map">
      <div class="site_map_left">
        友情链接：      
        <a  href="https://explorer.eoseco.com/" target="_blank">eoseco</a>
        <a  href="https://party.eosmonitor.io/" target="_blank">eosmonitor.io</a>
        <a  href="http://eostoken.im/" target="_blank">eostoken</a>
        <a  href="https://www.imeos.one/" target="_blank">imeos</a>
        <a  href="https://meet.one/" target="_blank">meet.one</a>
        <a  href="https://www.eosforce.io/?lang=Cn" target="_blank">eosforce</a>
        <a  href="https://eostoken.github.io/EOS-Navigator/" target="_blank">EOS guide</a>
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