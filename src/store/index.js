import Vue from "vue";
import Vuex from "vuex";

import consultations from "./consultations.js";
import patients from "./patients.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    consultations,
    patients,
  },
});
