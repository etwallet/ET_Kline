<template>
  <div class="sidebar">
    <div class="menu_group" v-for="group in menus[option]">
      <!-- <div class="title">
        {{group.title}}
      </div> -->
      <div class="menu_item" v-for="item in group.children">
        <router-link :to="{ name: item.name}" class="item_link">
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  props: ["option"],
  data() {
    return {
      menus: {
        order: [
          {
            title: this.$t("SideBar.OrderTitle"),
            children: [
              {
                title: this.$t("SideBar.Prcessing"),
                name: "OrderProcessing"
              },
              {
                title: this.$t("SideBar.Complete"),
                name: "OrderComplete"
              }
            ]
          },
          {
            title: this.$t("SideBar.ExchangeTitle"),
            children: [
              {
                title: this.$t("SideBar.ExchangePrcessing"),
                name: "EntrustProcessing"
              },
              {
                title: this.$t("SideBar.ExchangeComplete"),
                name: "EntrustComplete"
              }
            ]
          }
        ],
        wallet: [
          {
            title: this.$t("SideBar.WalletTitle"),
            children: [
              {
                title: this.$t("SideBar.Balance"),
                name: "WalletBalance"
              },
              {
                title: this.$t("SideBar.Recharge"),
                name: "WalletRecharge"
              },
              {
                title: this.$t("SideBar.Withdraw"),
                name: "WalletWithdraw"
              },
              {
                title: this.$t("SideBar.Bill"),
                name: "WalletBill"
              },
              {
                title: "我的FFC",
                name: "WalletCny"
              }
            ]
          }
        ],
        baike: [
          {
            title: "数字资产介绍",
            children: [
              {
                title: this.$t("Basic.BTC"),
                name: "Btc"
              },
              {
                title: this.$t("Basic.ETH"),
                name: "Eth"
              },
              {
                title: this.$t("Basic.LTC"),
                name: "Ltc"
              },
              {
                title: this.$t("Basic.LBTC"),
                name: "Lbtc"
              },
              {
                title: this.$t("Basic.OSC"),
                name: "Wkc"
              },
              {
                title: this.$t("Basic.DGC"),
                name: "Dgc"
              },
              {
                title: this.$t("Basic.CBC"),
                name: "Cbc"
              },
              {
                title: this.$t("Basic.XDAG"),
                name: "Xdag"
              },
              {
                title: this.$t("Basic.FFC"),
                name: "Ffc"
              }
            ]
          }
        ],
        market: [
          {
            title: this.$t("SideBar.MarketTitle"),
            children: [
              {
                title: this.$t("SideBar.MarketBuy"),
                name: "MarketBuy"
              },
              {
                title: this.$t("SideBar.MarketSell"),
                name: "MarketSell"
              }
            ]
          }
        ],
        user: [
          {
            title: this.$t("SideBar.UserTitle"),
            children: [
              {
                title: this.$t("SideBar.UserInfo"),
                name: "UserInfo"
              },
              {
                title: this.$t("SideBar.UserSecurity"),
                name: "UserSecurity"
              }
              // ,
              // {
              //   title: this.$t("SideBar.MyAPI"),
              //   name: "Api"
              // }
            ]
          }
        ],
        Business: [
          {
            title: this.$t("SideBar.BusinessTitle"),
            children: [
              {
                title: this.$t("SideBar.UserInfo"),
                name: "UserInfo"
              },
              {
                title: this.$t("SideBar.UserSecurity"),
                name: "UserSecurity"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {},
  created: function() {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/Sidebar.scss";
</style>