<template>
  <div class="container bg-gray">

    <dialog-view></dialog-view>
    <div class="member-view bg-white">
      <img
        src="/static/images/default_avatar.png"
        mode="widthFix"
        class="member-image"
      />
      <div class="member-info">
        <div class="member-name">{{memberInfo.personName}}</div>
        <div class="member-detail">床位号：{{memberInfo.room}}</div>
        <div class="member-detail">包伙等级：{{memberInfo.mealsPrice}}</div>
        <div class="member-detail">会员卡号：{{memberInfo.bizCardNumber}}</div>
      </div>
    </div>
    <div class="date-view center bg-white">
      <van-action-sheet
        v-model="show"
        :actions="actions"
      />
      <div
        @tap="selectWeek(item)"
        class="date-text"
        :class="{'pressed':item.pressed}"
        v-show="item.show"
        v-for="(item, index) in weeks"
      >
        {{item.text}}
      </div>

    </div>
    <div class="combo-view bg-white">

    </div>
    <combo-view
      v-for="(combo,index) in comboList"
      :key="index"
      :combo="combo"
      @submit="showModal"
    ></combo-view>
    <weui-modal
      ref="confirm"
      title="是否预定该套餐？"
      content=" "
      :showCancel="true"
      @confirm="handleSubmit"
    ></weui-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatNumber, formatFullDate } from "../../../utils";
import { getComboList, submitCombo } from "../../../api";
import ComboView from "../../../widgets/combo-view";
import DialogView from "../../../widgets/dialog-view";
import WeuiModal from "mpvue-weui/src/modal";

export default {
  beforeMount() {
    this.getWeeks().then(date => {
      this.getList(date);
    });
  },
  components: {
    ComboView,
    DialogView,
    WeuiModal
  },
  data() {
    return {
      weeks: [],
      comboList: [],
      show: false,
      needs: [],
      selectedNeed: null,
      caterTypeId: "",
      list: []
    };
  },
  computed: {
    ...mapState(["memberInfo"])
  },
  methods: {
    handleSelectNeeds(data) {
      this.selectedNeed = data;
    },
    showModal(data) {
      this.$refs.confirm.show();
      const { caterTypeId, list } = data;
      this.caterTypeId = caterTypeId;
      this.list = list;
    },
    handleSubmit() {
      const userId = 1;
      const { bizCardNumber } = this.memberInfo;

      const startDate = formatFullDate(
        this.weeks.filter(item => item.pressed === true)[0].monday
      );
      submitCombo(
        startDate,
        bizCardNumber,
        this.caterTypeId,
        userId,
        this.list
      ).then(data => {
        console.log(data);
        if (data.status === "100") {
          wx.showToast({
            title: "预定成功",
            icon: "none"
          });
          wx.reLaunch({
            url: "/pages/index/main"
          });
        }
      });
    },
    getList(date) {
      getComboList(this.memberInfo.hrId, formatFullDate(date)).then(data => {
        let { caseList } = data;
        this.comboList = caseList.map((item, index) => {
          const { a1, a2, a3, a4, a5, a6, a7, caterTypeId, name, price } = item;
          // const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
          return {
            list: [
              {
                day: "周一",
                content: a1.content.split("\n"),
                needs: Object.keys(a1.needs[0]).length ? a1.needs : null
              },
              {
                day: "周二",
                content: a2.content.split("\n"),
                needs: Object.keys(a2.needs[0]).length ? a2.needs : null
              },
              {
                day: "周三",
                content: a3.content.split("\n"),
                needs: Object.keys(a3.needs[0]).length ? a3.needs : null
              },
              {
                day: "周四",
                content: a4.content.split("\n"),
                needs: Object.keys(a4.needs[0]).length ? a4.needs : null
              },
              {
                day: "周五",
                content: a5.content.split("\n"),
                needs: Object.keys(a5.needs[0]).length ? a5.needs : null
              },
              {
                day: "周六",
                content: a6.content.split("\n"),
                needs: Object.keys(a6.needs[0]).length ? a6.needs : null
              },
              {
                day: "周日",
                content: a7.content.split("\n"),
                needs: Object.keys(a7.needs[0]).length ? a7.needs : null
              }
            ],
            caterTypeId,
            name,
            price
          };
        });
      });
    },
    selectWeek(week) {
      this.weeks = this.weeks.map((item, index) => {
        if (week.text === item.text) {
          item.pressed = true;
        } else {
          item.pressed = false;
        }
        return item;
      });
    },

    formatWeeks(monday, sunday) {
      return `${this.formatDate(monday)}-${this.formatDate(sunday)}`;
    },
    formatDate(date) {
      const month = formatNumber(date.getMonth() + 1);
      const day = formatNumber(date.getDate());

      return `${month}月${day}日`;
    },
    getMonday(date) {
      var day = date.getDay() || 7;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1 - day
      );
    },
    getSunday(date) {
      var day = date.getDay() || 7;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 7 - day
      );
    },

    getWeeks() {
      return new Promise((resolve, reject) => {
        const today = new Date();

        const Monday = this.getMonday(today);
        const Sunday = this.getSunday(today);
        const nextMonday = this.getMonday(
          new Date(new Date().setDate(today.getDate() + 7))
        );
        const nextSunday = this.getSunday(
          new Date(new Date().setDate(today.getDate() + 7))
        );
        let showWeek = false;
        if (
          today.getDay() === 5 ||
          today.getDay() === 6 ||
          today.getDay() === 0
        ) {
          showWeek = true;
        }
        this.weeks = [
          {
            monday: Monday,
            sunday: Sunday,
            text: this.formatWeeks(Monday, Sunday),
            pressed: true,
            show: true
          },
          {
            monday: nextMonday,
            sunday: nextSunday,
            text: this.formatWeeks(nextMonday, nextSunday),
            pressed: false,
            show: showWeek
          }
        ];
        resolve(Monday);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.member-view {
  padding: 20rpx 40rpx;
  flex-direction: row;
  margin-bottom: 2rpx;
}

.member-image {
  width: 75px;
  margin-right: 40rpx;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 18px;
  color: #333;
  margin-bottom: 7px;
  font-weight: bold;
}

.member-detail {
  font-size: 15px;
  margin-bottom: 10px;
}

.date-view {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  margin-bottom: 20rpx;
}

.date-text {
  color: #333;
  font-size: 32rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.date-text.pressed {
  color: #3598db;
}
</style>
