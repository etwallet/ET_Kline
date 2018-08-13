<template>
  <div style="position:relative">
    <el-row :gutter="24" class="navbar">
      <el-col :span="4" class="nav_item">
       
      </el-col>
      <el-col :span="5" class="nav_item">
       
      </el-col>
      <el-col :span="5" class="nav_item">
       
       


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
      <el-col :span="5" class="nav_item">
      
      </el-col>
      <el-col :span="5" class="nav_item">
       
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      isShow: false,
      isIos: false
    };
  },
  created: function() {},
  methods: {
    btnisand: function() {
      this.isIos = false;
    },
    btnisios: function() {
      this.isIos = true;
    },
    showapp: function() {
      this.isShow = true;
    },
    hideapp: function() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scope>
@import "../../assets/css/top/NavBar.scss";
</style>