<template>
  <div class="container bg-gray">
    <scroll-view
      class="inspect-list"
      scroll-y
    >
      <inspect-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></inspect-item>

    </scroll-view>
  </div>
</template>

<script>
import InspectItem from "../../../widgets/inspect-item";
import { getInspectList } from "../../../api";
export default {
  beforeMount() {
    getInspectList().then(data => {
      this.list = data.list;
    });
  },
  data() {
    return {
      list: []
    };
  },
  components: {
    InspectItem
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.inspect-list {
  height: 100%;
}
</style>
