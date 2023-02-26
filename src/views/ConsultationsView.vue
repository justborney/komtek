<template>
  <div class="consultations-view">
    <el-button
      type="primary"
      class="add-button"
      @click="consultationAdditionFormVisible = true"
    >
      <i class="el-icon-plus"></i>
      Добавить консультацию
    </el-button>

    <ConsultationsTable />

    <el-dialog
      title="Добавление консультации"
      :visible.sync="consultationAdditionFormVisible"
      width="30%"
    >
      <ConsultationsForm
        v-if="consultationAdditionFormVisible"
        @close="consultationAdditionFormVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import ConsultationsTable from "@/components/ConsultationsTable.vue";
import ConsultationsForm from "@/components/ConsultationsForm.vue";

export default {
  name: "ConsultationsView",

  components: { ConsultationsTable, ConsultationsForm },

  data() {
    return {
      consultationAdditionFormVisible: false,
    };
  },
};
</script>

<style scoped lang="scss">
.add-button {
  margin-bottom: 16px;

  i {
    font-weight: 600;
    margin-right: 4px;
  }
}
</style>
