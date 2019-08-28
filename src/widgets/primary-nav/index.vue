<template>
  <div class="primary-navbar">
    <img
      @tap="goPage(item.url,item.name)"
      v-for="(item,index) in navbarItems"
      :src="item.src"
      class="navbar-item"
      mode="widthFix"
      :key="index"
    />

  </div>
</template>

<script>
import { scan } from "../../utils";

export default {
  data() {
    return {
      navbarItems: [
        {
          src: "/static/images/smxf.png"
        },
        {
          src: "/static/images/hlxm.png",
          url: "/pages/care/list/main",
          name: "护理项目"
        }
      ]
    };
  },
  methods: {
    goPage(url, name, type = "") {
      if (!url) {
        wx.showToast({
          title: "即将上线",
          icon: "none"
        });
        return;
      }
      if (name === "护理项目") {
        scan().then(res => {
          wx.navigateTo({
            url: `/pages/service/list/main?code=${res.result}`
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.primary-navbar {
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
}

.navbar-item {
  width: 163px;
}
</style>
