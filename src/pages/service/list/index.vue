<template>
  <div class="container bg-gray">
    <weui-modal
      ref="confirm"
      title="是否登记该服务？"
      content=" "
      :showCancel="true"
      @confirm="handleSubmit"
    ></weui-modal>
    <scroll-view
      scroll-y
      class="service-list"
    >

      <div
        class="service"
        v-for="(item, index) in serviceList"
        :key="index"
      >
        <div class="service-header">
          <div class="service-title">
            <text class="service-member">{{personName}}</text><text class="service-address">{{room}}</text>
          </div>
        </div>
        <div class="service-content">
          <div class="service-info-view">
            <text class="service-info-name">服务项目：</text>
            <text class="serice-info-value">{{item.nurseItem}}</text>
          </div>
          <div class="service-info-view">
            <text class="service-info-name">服务进度：</text>
            <progress
              :percent="item.nurseTimes/item.serviceTimes"
              stroke-width="20"
              style="flex:1;margin-right:20rpx"
              color="#ffc953"
              border-radius="10"
            />
            <text>{{item.nurseTimes}} / {{item.serviceTimes}}</text>
          </div>
          <div class="service-info-view">
            <text class="service-info-name">结束日期：</text>
            <text class="serice-info-value">{{item.endTime?item.endTime.time:"长期"}}</text>
          </div>
        </div>
        <div class="service-footer center">
          <text
            class="text-btn"
            @tap="showModal(item.id)"
          >服务登记</text>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { getServiceList, submitService } from "../../../api";
import { formatFullDate } from "../../../utils";
import WeuiModal from "mpvue-weui/src/modal";
export default {
  data() {
    return {
      serviceList: [],
      username: "",
      personName: "",
      room: "",
      code: "",
      nursePerson: "",
      id: "",
      nurseDate: ""
    };
  },
  methods: {
    showModal(id) {
      this.$refs.confirm.show();
      this.id = id;
    },
    handleSubmit() {
      submitService(this.username, this.id, formatFullDate(new Date())).then(
        data => {
          if (data.status === 100) {
            wx.showToast({
              title: data.message,
              icon: "none"
            });
            this.getList(this.code);
          }
        }
      );
    },
    getList(code) {
      getServiceList(code).then(data => {
        const { personName, list, room } = data;
        list.forEach(item => {
          if (item.endTime) {
            item.endTime.time = formatFullDate(new Date(item.endTime.time));
          }
        });
        console.log(list);
        this.serviceList = list;
        this.personName = personName;
        this.room = room;
      });
    }
  },
  components: {
    WeuiModal
  },

  onLoad(options) {
    let _this = this;
    wx.getStorage({
      key: "username",
      success(res) {
        _this.username = res.data;
      }
    });

    const { code } = options;
    this.code = code;
    this.getList(code);
  }
};
</script>

<style lang="scss" scoped>
.service-list {
  height: 100%;
}

.service {
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 40rpx;
}

.service-header {
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  color: #fff;
  background-color: #ffc953;
  height: 100rpx;
  flex-direction: row;
  padding-left: 32rpx;
  align-items: center;
}

.service-title {
  flex-direction: row;
  align-items: baseline;
}

.service-member {
  font-size: 44rpx;
  margin-right: 15rpx;
}

.service-address {
  font-size: 32rpx;
}

.service-content {
  padding-left: 32rpx;
  padding-right: 32rpx;
  background-color: #fff;
  height: 300rpx;
  justify-content: space-around;
  border-bottom: 1px solid #f5f5f5;
}

.service-footer {
  height: 100rpx;
  background-color: #fff;
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}

.service-info-view {
  flex-direction: row;
}

.text-btn {
  font-size: 34rpx;
  color: #3598db;
}
</style>
