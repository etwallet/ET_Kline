<template>
  <div>
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

  
  </div>
</template>
<script>
import { mapState } from "vuex";
import user from "../../models/user";

export default {
  name: "LoginTop",
  props: {
    isHasOrderTip: Boolean
  },
  data() {
    return {
      isClose: true
    };
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      access_token: state => state.user.access_token
    })
  },
  methods: {
    signOut: function() {
      user
        .signOut()
        .then(() => {
          window.location.href = "/";
        })
        .catch(() => {});
    },
    close: function() {
      this.isClose = false;
    }
  },
  created: function() {},
  mounted: function() {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/top/LoginTop.scss";
</style>