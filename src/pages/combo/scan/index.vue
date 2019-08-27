<template>
  <div class="container bg-gray">
    <div
      class="scan-view bg-white"
      @tap="scan"
    >
      <img
        src="/static/images/set_meal_scan.png"
        mode="widthFix"
        class="scan-view-image"
      />
      <div class="scan-view-text">扫描会员卡读取会员信息</div>
    </div>
    <div class="notice-view">
      <div
        class="notice-view-title"
        style="display:block"
      >套餐预定须知：</div>
      <div class="notice-view-info">1、扫描会员卡，识别老人的包月等级</div>
      <div class="notice-view-info">2、选择套餐提交</div>
      <div class="notice-view-info">3、每周六/周日可预定下一周整周的套餐</div>
    </div>

  </div>

</template>

<script>
import { getMemberInfo } from "../../../api";
import { mapMutations } from "vuex";
import { scan } from "../../../utils";

export default {
  methods: {
    ...mapMutations({
      setMemberInfo: "setMemberInfo"
    }),
    scan() {
      scan().then(res => {
        getMemberInfo(res.result)
          .then(data => {
            const { status } = data;
            if (status === 103) {
              wx.showToast({
                title: "没有找到老人信息"
              });
            } else if (status === 100) {
              const {
                bizCardNumber,
                personName,
                hrId,
                mealsMark,
                mealsPrice,
                money,
                photoPath,
                room
              } = data;
              this.setMemberInfo({
                bizCardNumber,
                personName,
                hrId,
                mealsMark,
                mealsPrice,
                money,
                photoPath,
                room
              });
            }
          })
          .then(() => {
            wx.navigateTo({
              url: "/pages/combo/submit/main"
            });
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scan-view {
  height: 200rpx;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.scan-view-image {
  width: 50px;
  margin-right: 30px;
}

.scan-view-text {
  font-size: 16px;
  color: #333;
}

.notice-view {
  padding: 60rpx 40rpx 0;
}

.notice-view-title {
  font-size: 42rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.notice-view-info {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 30rpx;
}
</style>
