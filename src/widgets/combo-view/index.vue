<template>
  <div>

    <div class="combo-item">
      <div class="combo-name-view">
        <div class="combo-name">{{combo.name}}</div>
        <div
          class="combo-submit"
          @tap="submit(combo.caterTypeId)"
        > 选择该套餐</div>
      </div>
      <scroll-view
        class="meal-list"
        scroll-x
      >
        <div
          class="meal-item"
          v-for="(item,itemIndex) in combo.list"
          :key="itemIndex"
          @tap="showNeeds(item.needs,item.day,combo.name)"
        >
          <div class="meal-day-view">
            <div class="meal-day">{{item.day}}</div>
            <div
              v-show="item.needs!==null"
              class="meal-needs"
            >
              {{needName?needName:"特需"}}
            </div>
          </div>
          <div class="meal-info">
            <div class="meal-content">{{item.content[0]}}</div>
          </div>
          <div class="meal-info">
            <div class="meal-content">{{item.content[1]}}</div>
          </div>
          <div class="meal-info">
            <div class="meal-content">{{item.content[2]}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import bus from "../../bus";
export default {
  props: ["combo", "selectedNeed"],
  mounted() {
    bus.$on("select", data => {
      if (data === null) return;

      if (this.combo.name === data.comboName) {
        const { name, week, id } = data;
        this.needName = name;

        let len = this.selectedNeedsArr.length;
        if (!len) {
          this.selectedNeedsArr.push({
            name,
            week,
            id
          });
        } else {
          for (var i = 0; i < len; i++) {
            if (this.selectedNeedsArr[i].week === week) {
              this.selectedNeedsArr[i].id = id;
              this.selectedNeedsArr[i].name = name;
            }
          }
        }
      }
    });
  },
  data() {
    return {
      show: false,
      selectedNeed: "",
      selectedNeedsArr: [],
      needName: ""
    };
  },
  computed: {},
  methods: {
    submit(caterTypeId) {
      this.$emit("submit", {
        caterTypeId,
        list: this.selectedNeedsArr
      });
    },
    showNeeds(needs, day, comboName) {
      if (needs === null) return;
      bus.$emit("show", { needs, day, comboName });
    }
  }
};
</script>

<style>
.combo-item {
  padding: 40rpx 0 40rpx 40rpx;
  background: #fff;
}

.combo-name {
  font-size: 32rpx;

  color: #3598db;
}

.combo-name-view {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.combo-submit {
  color: #3598db;
  font-size: 15px;
  margin-right: 40rpx;
}

.meal-list {
  white-space: nowrap;
}

.meal-item {
  width: 450rpx;
  padding: 30rpx;
  border: 2rpx solid #d7dee0;
  display: inline-block;
  margin-right: 20rpx;
  border-radius: 8rpx;
}

.meal-day {
  font-size: 42rpx;
  color: #3598db;
}

.meal-info {
  flex-direction: row;
}

.meal-time {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.meal-content {
  flex: 1;
  font-size: 32rpx;
  color: #333;
  white-space: pre-wrap;
}

.meal-day-view {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.meal-needs {
  color: #3598db;
  font-size: 15px;
}
</style>
