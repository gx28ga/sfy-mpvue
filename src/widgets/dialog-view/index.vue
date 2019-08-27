<template>
  <div v-show="show">
    <div class="dialog-view">
      <div class="dialog">
        <div class="dialog-header">{{comboName}} {{day}}</div>
        <div class="dialog-content">
          <div
            class="dialog-cell"
            v-for="(item,index) in needs"
            :key="index"
            @tap="select(item.type,item.id,day,comboName)"
          >
            {{item.type}}
          </div>

          <div
            class="dialog-cell"
            @tap="close"
          >
            取消
          </div>
        </div>
      </div>
    </div>
    <div class="mask">

    </div>

  </div>

</template>

<script>
import bus from "../../bus";
export default {
  data() {
    return {
      needs: [],
      show: false,
      day: "",
      comboName: ""
    };
  },
  mounted() {
    bus.$on("show", data => {
      this.show = true;
      const { needs, day, comboName } = data;
      this.needs = needs;
      this.day = day;
      this.comboName = comboName;
    });
  },
  methods: {
    select(type, id, day, comboName) {
      bus.$emit("select", {
        name: type,
        id,
        week: day,
        comboName
      });
      this.show = false;
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
}
.dialog-view {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 40;
  justify-content: center;
  align-items: stretch;
}
.dialog {
  height: 240px;

  margin: 0 40px;
}

.dialog-header {
  height: 60px;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  color: #ffffff;
  background: #3598db;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.dialog-content {
  background-color: #ffffff;
  flex: 1;
  align-items: stretch;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.dialog-cell {
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #3598db;
}
</style>
