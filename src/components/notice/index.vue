<template>
  <div class="notice" v-if="notices.length > 0">
    <div class="notice_content" >
     <div style="display: inline-block;" v-for="(item,index) in  notices" :key="index">
      <div class="marquee" ><a @click="notice(item.id)">{{item.title}}</a><span v-show="index!=2" style="margin:0px 16px;color:eee;">/</span></div>
      </div>
      <!--<div class="marquee" ><a :href="item.link" target="_blank">{{item.title}}</a><span v-show="index!=2" style="margin:0px 16px;color:eee;">/</span></div> <div class="trade_help"><a :href="'/'+ $locale.current() + '/help.html'" target="_blank">{{$t('Notice.Notice_Help')}}<i class="icon iconfont icon-icontishiwenhao"></i></a></div> -->
    </div>
  </div>
</template>
<script>
import data from "../../models/data";
import notice1 from "../../models/notice1";
export default {
  name: "Notice",
  data() {
    return {
      content: "",
      link: "",
      notices: []
    };
  },
  created: function() {
    this.load_list();
    // data
    //   .getNotice()
    //   .then(result => {
    //     //  alert( ) ;
    //     this.notices = result[this.$locale.current()];
    //     // this.content = result[this.$locale.current()]['content']
    //     // this.link = result[this.$locale.current()]['link']
    //   })
    //   .catch(e => {});
  },
  methods: {
    load_list() {
      notice1
        .list()
        .then(result => {
          if (result.code == 0) {
            if (result.data.notices.length > 3) {
              this.notices = result.data.notices.slice(0, 3);
            } else {
              this.notices = result.data.notices;
            }
          }
        })
        .catch(e => {});
    },
    notice(id) {
      this.$router.push("/notice/" + id);
    }
    // load_content(id) {
    //   notice1
    //     .content(id)
    //     .then(result => {})
    //     .catch(e => {});
    // }

    // getHumanDate: function(timestamp) {
    //   if (timestamp == 0) return;
    //   return moment(timestamp).format("YYYY/MM/DD HH:mm");
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/Notice1.scss";
</style>