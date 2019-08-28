<template>
  <div class="container bg-login">
    <div class="logo-view">
      <img
        src="/static/images/logo.png"
        class="logo"
        mode="widthFix"
      />
      <div class="logo-name">杭州第三社会福利院</div>
    </div>
    <div class="login-view">
      <div class="input-group-view">
        <div class="input-row-view">
          <img
            src="/static/images/user.png"
            class="input-icon"
            mode="widthFix"
          />
          <input
            placeholder="请输入账号"
            class="input"
            type="text"
            v-model="username"
          />
        </div>
        <div class="divider"></div>
        <div class="input-row-view">
          <img
            src="/static/images/password.png"
            class="input-icon"
            mode="widthFix"
          />
          <input
            placeholder="请输入密码"
            class="input"
            type="password"
            v-model="password"
          />
        </div>
      </div>
      <button
        class="btn-login"
        @tap="login"
      >登录</button>
    </div>
  </div>
</template>

<script>
import { login } from "../../api";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!this.username) {
        wx.showToast({
          title: "请输入用户名",
          icon: "none"
        });
        return;
      }
      if (!this.password) {
        wx.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      login(this.username, this.password).then(data => {
        const { result, id } = data;
        if (result === 0 && id) {
          wx.setStorage({
            key: "id",
            data: id
          });
          wx.setStorage({
            key: "username",
            data: this.username
          });

          wx.navigateTo({
            url: "/pages/index/main"
          });

          wx.showToast({
            title: "登录成功",
            icon: "none"
          });
        } else if (result === 1) {
          wx.showToast({
            title: "登录失败",
            icon: "none"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-view {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  width: 110px;
}

.logo-name {
  margin-top: 40rpx;
  font-size: 36rpx;
  color: #fff;
}

.login-view {
  flex: 2;
  padding-left: 40rpx;
  padding-right: 40rpx;
  align-items: center;
}

.input-group-view {
  margin-top: 60rpx;
  background-color: #eeeeee;
  border-radius: 20rpx;
  width: 100%;
  margin-bottom: 30rpx;
  height: 180rpx;
}

.input-row-view {
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.input {
  flex: 1;
  font-size: 30rpx;
  padding-left: 5rpx;
  color: #333;
}

.input-icon {
  width: 20px;
}

.btn-login {
  height: 80rpx;
  width: 100%;
  font-size: 36rpx;
  color: #3c9cde;
  background-color: #e3f9ff;
}
.divider {
  width: 100%;
  height: 2rpx;
  background-color: #cbcbcb;
}
</style>
