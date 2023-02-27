<template>
  <el-container>
    <el-header>
      <el-menu
        router
        mode="horizontal"
        :default-active="activeIndex"
      >
        <el-menu-item index="patients">Пациенты</el-menu-item>
        <el-menu-item index="consultations">Консультации</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    activeIndex() {
      return this.$route.name;
    },
  },

  methods: {
    ...mapActions("patients", ["getPatients"]),
    ...mapActions("consultations", ["getConsultations"]),
  },

  created() {
    this.getPatients();
    this.getConsultations();
  },
};
</script>
