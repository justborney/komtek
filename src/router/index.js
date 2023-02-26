import Vue from "vue";
import VueRouter from "vue-router";

import PatientsView from "../views/PatientsView.vue";
import ConsultationsView from "../views/ConsultationsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      next({ path: "/patients" });
    },
  },
  {
    path: "/patients",
    name: "patients",
    component: PatientsView,
  },
  {
    path: "/consultations",
    name: "consultations",
    component: ConsultationsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
