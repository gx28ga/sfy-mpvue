<template>
  <div class="primary-navbar">
    <img
      v-for="item in navbarItems"
      :src="item.src"
      class="navbar-item"
      mode="widthFix"
    />

  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarItems: [
        {
          src: "/static/images/smxf.png"
        },
        {
          src: "/static/images/hlxm.png"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.primary-navbar {
  margin: 20px;
  flex-direction: row;
  justify-content: space-between;
}

.navbar-item {
  width: 163px;
}
</style>
