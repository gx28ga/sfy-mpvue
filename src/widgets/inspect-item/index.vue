<template>
  <div
    class="inspect-item"
    @tap="goPage(item)"
  >
    <div class="title-view">
      <div class="title">{{item.content}}</div>
      <div class="status">已申请，待上传保修结果</div>
    </div>
    <div class="inspect-item-row"><span class="label">发现问题时间：</span><span class="value">{{item.findTime}}</span></div>
    <div class="inspect-item-row"><span class="label">楼宇：</span><span class="value">{{item.building}}</span></div>
    <div class="inspect-item-row"><span class="label">维修地点：</span><span class="value">{{item.repairPlace}}</span></div>
    <div class="flex-view">
      <div class="inspect-item-row person-view"><span class="label">巡查人员：</span><span class="value">{{item.repairer}}</span></div>
      <div class="inspect-item-row person-view"><span class="label">维修人员：</span><span class="value">{{item.patrolOfficer}}</span></div>
    </div>
    <div class="flex-view">
      <button class="btn-primary action">跟踪进度</button>
      <div class="divider"></div>
      <button class="btn-primary action">维修完成</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    goPage(item) {
      wx.navigateTo({
        url: `/pages/inspect/detail/main?item=${JSON.stringify(item)}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.inspect-item {
  background: #ffffff;
  padding: 20px;

  .title-view {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .title {
    font-size: 21px;
    color: #333333;
    font-weight: bold;
  }
  .status {
    font-size: 14px;
    color: #ff5c5c;
  }
  .inspect-item-row {
    margin-bottom: 15px;
    flex-direction: row;
    align-items: center;
    .label {
      font-size: 16px;
      color: #666666;
    }
    .value {
      font-size: 16px;
      color: #333333;
    }
  }
  .flex-view {
    flex-direction: row;

    .person-view {
      width: 1%;
      flex: 1;
    }
    .divider {
      width: 20px;
    }
    .action {
      width: 1%;
      flex: 1;
    }
  }
}
</style>
