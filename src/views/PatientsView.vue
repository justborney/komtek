<template>
  <div class="patients-view">
    <el-button
      type="primary"
      class="add-button"
      @click="patientAdditionFormVisible = true"
    >
      <i class="el-icon-plus"></i>
      Добавить пациента
    </el-button>

    <PatientsSearch v-model="searchedPatient" class="search" />

    <PatientsTable :searched-patient="searchedPatient" />

    <el-dialog
      title="Добавление пациента"
      :visible.sync="patientAdditionFormVisible"
      width="30%"
    >
      <PatientsForm
        v-if="patientAdditionFormVisible"
        @close="patientAdditionFormVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import PatientsTable from "@/components/PatientsTable.vue";
import PatientsSearch from "@/components/PatientsSearch.vue";
import PatientsForm from "@/components/PatientsForm.vue";

export default {
  name: "PatientsView",

  components: { PatientsTable, PatientsSearch, PatientsForm },

  data() {
    return {
      searchedPatient: "",
      patientAdditionFormVisible: false,
    };
  },
};
</script>

<style scoped lang="scss">
.search {
  margin-bottom: 16px;
}

.add-button {
  margin-bottom: 16px;

  i {
    font-weight: 600;
    margin-right: 4px;
  }
}
</style>
