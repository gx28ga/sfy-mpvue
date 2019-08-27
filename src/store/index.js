import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import getters from "./getter";
import state from "./state";
import logger from "vuex/dist/logger";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [logger()]
});
