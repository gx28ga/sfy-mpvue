<template>
  <div class="container bg-gray">
    <div class="header">日常巡查报告单</div>
    <div class="inspect-item">
      <div class="title-view">
        <div class="title">{{item.content}}</div>

      </div>
      <div class="inspect-item-row"><span class="label">发现问题时间：</span><span class="value">{{item.findTime}}</span></div>
      <div class="inspect-item-row"><span class="label">楼宇：</span><span class="value">{{item.building}}</span></div>
      <div class="inspect-item-row"><span class="label">维修地点：</span><span class="value">{{item.repairPlace}}</span></div>
      <div class="flex-view">
        <div class="inspect-item-row person-view"><span class="label">巡查人员：</span><span class="value">{{item.repairer}}</span></div>
        <div class="inspect-item-row person-view"><span class="label">维修人员：</span><span class="value">{{item.patrolOfficer}}</span></div>
      </div>
      <div class="inspect-item-row"><span class="label">联系电话：</span><span class="value">{{item.phone}}</span></div>

    </div>
    <div class="header">流程信息</div>
    <div class="progress">
      <div
        class="progress-item"
        v-for="(item, index) in progressData"
        :key="index"
      >
        <div class="header-view">
          <div class="dot"></div>
          <div class="status">维修进度更新</div>
          <div class="date">{{item.publishTime}}</div>

        </div>
        <div class="content-view">
          <div class="info">
            <div class="label">
              审核人：
            </div>
            <div class="value">{{item.user}}</div>
          </div>
          <div class="info">
            <div class="label">
              意见：
            </div>
            <div class="value">{{item.view}}</div>
          </div>
          <div class="info">
            <img
              class="img"
              v-if="item.photoPath"
              :src="basePath+'/flyoa/'+item.photoPath"
            />

          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { getInspectDetail, API_BASE_URL } from "../../../api";
export default {
  data() {
    return {
      item: null,
      progressData: [],
      basePath: API_BASE_URL
    };
  },
  onLoad(options) {
    const { item } = options;

    this.item = JSON.parse(item);
    getInspectDetail(this.item.id).then(data => {
      this.progressData = data.list;
    });
  },
  methods: {
    previewImg: function(e) {
      console.log(e.currentTarget.dataset.index);
      var index = e.currentTarget.dataset.index;
      var imgArr = this.data.imgArr;
      wx.previewImage({
        current: imgArr[index], // 当前图片地址
        urls: imgArr, // 所有要预览的图片的地址集合 数组形式
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 55px;
  padding-left: 20px;
  font-size: 16px;
  background-color: #ffffff;
  margin-bottom: 1px;
  justify-content: center;
}

.inspect-item {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 10px;

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

.progress-item {
  padding: 4px 20px 0;
  background-color: #ffffff;
  .header-view {
    flex-direction: row;
    align-items: center;

    .dot {
      width: 5px;
      height: 5px;
      background-color: #cfcfcf;
      border-radius: 50%;
    }
    .status {
      padding-left: 14px;
      font-size: 16px;
      color: #999999;
    }
    .date {
      font-size: 14px;
      color: #999999;
      flex: 1;
      text-align: right;
    }
  }
  .content-view {
    border-left: 1px solid #cfcfcf;
    margin-left: 2px;
    padding-left: 16px;
    padding-top: 11px;
  }
  .info {
    flex-direction: row;
    margin-bottom: 15px;
    .img {
      width: 60px;
      height: 60px;
    }
    .label {
      font-size: 16px;
      color: #999999;
    }
    .value {
      flex: 1;
      font-size: 16px;
      color: #333333;
    }
  }
  &:last-child {
    .dot {
      width: 9px;
      height: 9px;
      background-color: #fff;
      border-radius: 50%;
      border: 3px solid #3598db;
      position: relative;
      left: -3px;
    }
    .content-view {
      border-color: transparent;
    }
  }
}
</style>
