
<script>
export default {};
</script>

<style lang="scss">
Page {
  display: flex;
  height: 100%;
  flex-direction: column;
}

view {
  display: flex;
  flex-direction: column;
}

text {
  display: flex;
  flex-direction: column;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  flex: 1;
}

.image-view {
  font-size: 0;
}

.center-horizontal {
  flex-direction: row;
  justify-content: center;
}

.center {
  justify-content: center;
  align-items: center;
}

.bg-gray {
  background-color: #f3f3f3;
}

.bg-white {
  background-color: #fff;
}

.bg-login {
  background-color: #308ecc;
}

.btn-primary {
  color: #fff;
  background-color: #308ecc;
  border-color: #308ecc;
  font-size: 17px;
  height: 40px;
  border-radius: 4px;
}
</style>
