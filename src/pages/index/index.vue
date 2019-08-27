<template>
  <div class="container">
    <scroll-view
      :style="{'height': '100%'}"
      scroll-y
    >
      <div class="banner-view">
        <img
          src="/static/images/banner.png"
          mode="widthFix"
          class="banner-image"
        />
        <div class="center user-view">
          <img
            src="/static/images/mrtx.png"
            width="160rpx"
            mode="widthFix"
            class="user-avatar"
          />

          <div class="user-name">服务专员：李小白</div>
        </div>
      </div>
      <primary-navbar></primary-navbar>
      <secondary-navbar></secondary-navbar>

    </scroll-view>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PrimaryNavbar from "../../widgets/primary-nav";
import SecondaryNavbar from "../../widgets/secondary-nav";

export default {
  beforeMount() {
    let app = getApp();
    console.log(app.globalData.userInfo);
  },
  data() {
    return {
      str: "abc"
    };
  },
  computed: {
    ...mapState(["count"])
  },
  components: {
    PrimaryNavbar,
    SecondaryNavbar
  },
  methods: {
    ...mapMutations({
      add: "add"
    })
  }
};
</script>

<style>
.banner-view {
  position: relative;
}
.banner-image {
  width: 375px;
}

.user-view {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.user-avatar {
  width: 80px;
  border-radius: 50%;

  margin-bottom: 20px;
}

.user-name {
  font-size: 32rpx;
  color: #fff;
}
</style>
