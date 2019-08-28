<template>
  <div class="secondary-navbar">

    <div
      class="narbar-row"
      v-if="rowIndex%3 === 0"
      v-for="(item,rowIndex) in navbarItems"
      :key="rowIndex"
    >
      <div
        @tap="goPage(item.url)"
        class="navbar-item"
        :key="name"
        v-for="(item, index) in navbarItems"
        v-if="index>=rowIndex&&index<(rowIndex+3)"
      >
        <div class="navbar-item-inner">
          <div class="navbar-item-view center">
            <img
              :src="item.src"
              class="navbar-item-icon"
              mode="widthFix"
            />
            <div class="navbar-item-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarItems: [
        {
          name: "套餐预订",
          src: "/static/images/tcyd.png",
          url: "/pages/combo/scan/main"
        },
        // {
        //   name: "炒菜外送",
        //   src: "/static/images/ccdc.png"
        //   // url: "/pages/cooking-page/index"
        // },
        // {
        //   name: "菜谱点餐",
        //   src: "/static/images/stdc.png"
        // },
        {
          name: "活动签到",
          src: "/static/images/hdqd.png",
          url: "/pages/activity/list/main"
        },
        // {
        //   name: "扫码查询",
        //   src: "/static/images/smcx.png"
        // },
        {
          name: "请假登记",
          src: "/static/images/qjdj.png"
          // url: "/pages/vacation-page/index"
        },
        {
          name: "日常巡查",
          src: "/static/images/rcxc.png",
          url: "/pages/inspect/list/main"
        }
      ]
    };
  },
  methods: {
    goPage(url, type = "") {
      if (!url) {
        wx.showToast({
          title: "即将上线",
          icon: "none"
        });
        return;
      }
      wx.navigateTo({
        url,
        type
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.secondary-navbar {
  background-color: #f3f3f3;
  padding-top: 1px;
  padding-bottom: 1px;
}
.narbar-row {
  flex-direction: row;
}

.navbar-item {
  width: calc(100% / 3);
  margin-bottom: 2rpx;
  margin-right: 2rpx;
}

.navbar-item:nth-child(3n) {
  margin-right: 0;
}

.navbar-item-inner {
  padding-bottom: 100%;
  position: relative;
}

.navbar-item-view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.navbar-item-icon {
  width: 50px;
}

.navbar-item-name {
  margin-top: 20rpx;
  font-size: 32rpx;
  color: #333;
}
</style>
