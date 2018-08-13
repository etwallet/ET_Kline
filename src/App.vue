<template>
  <div class="page">
  <div id="app" :class="$locale.current()">
    <router-view></router-view>
  </div>
  <Bottom></Bottom>
  </div>
</template>

<script>
import kStat from "./utils/kStat";
import detector from "detector";

import Bottom from "./components/bottom";
export default {
  name: "app",
  components: {
    Bottom
  },
  data() {
    return {
      isShowBottom: true
    };
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      // console.log( to , from )
      if (to.name == "Exchange" || to.name == "Notice") {
        this.isShowBottom = false;
      } else {
        this.isShowBottom = true;
      }
    }
  },
  created() {
    kStat.push([
      "version_" + process.env.VERSION,
      detector.os.name,
      detector.browser.name + "_" + detector.browser.version,
      1
    ]);
  }
};
</script>

<style lang="scss">
@import "./assets/css/Common.scss";
</style>
