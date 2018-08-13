<template>
  <div class="logo_content" >
    <router-link :to="{ name: 'Index'}" class="logo">   
    </router-link>
   ET去中心化交易网
  </div>
</template>
<script>
export default {
  name: "Logo",
  data() {
    return {};
  },
  created: function() {},
  method: {}
};
</script>
<style lang="scss" scope>
@import "../../assets/css/top/Logo.scss";
</style>