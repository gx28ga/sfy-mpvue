<template>
  <div class="container">
    <scroll-view class="activity-list">
      <div
        class="activity"
        v-for="(item, index)  in activityList"
        :key="index"
      >
        <div class="info">
          <div class="title">
            {{item.name}}
          </div>
          <div class="row">
            开始时间：{{item.startTime}}
          </div>
          <div class="row">
            结束时间：{{item.endTime}}
          </div>
          <div class="row">
            活动地点：{{item.place}}
          </div>
          <div class="row">
            活动内容：{{item.content}}
          </div>

        </div>
        <div
          class="scan"
          @tap="scan(item.id)"
        >
          <img
            mode="widthFix"
            src="/static/images/smfw.png"
            alt=""
            class="img"
          >
          <div class="text">
            扫码签到
          </div>

        </div>
      </div>
    </scroll-view>
    <weui-actionsheet
      @confirm="confirm"
      ref="actionsheet"
      :itemList="itemList"
    ></weui-actionsheet>
  </div>

</template>

<script>
import { getActivityList, getMemberInfo, signActivity } from "../../../api";
import { scan } from "../../../utils";
import WeuiActionsheet from "mpvue-weui/src/actionsheet";
export default {
  beforeMount() {
    this.getList();
    let _this = this;
    wx.getStorage({
      key: "id",
      success(res) {
        _this.userId = res.data;
      }
    });
  },
  data() {
    return {
      itemList: ["签到", "签退"],
      activityList: [],
      hrId: "",
      userId: ""
    };
  },
  components: {
    WeuiActionsheet
  },
  methods: {
    confirm(data) {
      console.log(data.tapIndex);
      signActivity(this.hrId, this.activityId, data.tapIndex, this.userId).then(
        data => {
          const { message, status } = data;
          wx.showToast({
            title: message,
            icon: "none"
          });
        }
      );
    },
    getList() {
      getActivityList().then(data => {
        this.activityList = data.caseList;
      });
    },
    showActionsheet() {
      this.$refs.actionsheet.show();
    },
    scan(id) {
      this.activityId = id;
      scan().then(res => {
        getMemberInfo(res.result).then(data => {
          const { status, hrId } = data;
          if (status === 103) {
            wx.showToast({
              title: "没有找到老人信息"
            });
          } else {
            this.hrId = hrId;
            this.showActionsheet();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-list {
  height: 100%;
}

.activity {
  padding: 20px;
  background-color: #ffffff;
  flex-direction: row;
  .info {
    flex: 1;
    .title {
      font-size: 18px;
      margin-bottom: 14px;
      color: #333333;
      font-weight: bold;
    }
    .row {
      font-size: 15px;
      margin-bottom: 10px;
      color: #333333;
    }
  }
  .scan {
    justify-content: center;
    align-items: center;
    .img {
      width: 50px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 15px;
      text-align: center;
    }
  }
}
</style>
