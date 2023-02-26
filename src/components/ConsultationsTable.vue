<template>
  <div class="consultations-table">
    <el-table
      border
      :data="formattedConsultations"
      empty-text="Нет консультаций"
      cell-class-name="column-symptoms"
    >
      <el-table-column
        sortable
        prop="patientName"
        label="Пациент"
        width="300"
      />
      <el-table-column sortable prop="date" label="Дата" width="120" />
      <el-table-column sortable prop="time" label="Время" width="100" />
      <el-table-column sortable prop="symptoms" label="Симптомы" />
      <el-table-column align="center" width="160">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            class="action"
            @click="opentEditForm(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            class="action"
            @click="remove(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Редактирование консультации"
      :visible.sync="consultationEditFormVisible"
      width="30%"
    >
      <ConsultationsForm
        v-if="consultationEditFormVisible"
        :edited-consultation="editedConsultation"
        @edit="handleEdit"
        @close="closeForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ConsultationsForm from "@/components/ConsultationsForm.vue";

export default {
  name: "ConsultationsTable",

  components: { ConsultationsForm },

  data() {
    return {
      consultationEditFormVisible: false,
      editedConsultation: {},
    };
  },

  computed: {
    ...mapState("patients", ["patients"]),
    ...mapState("consultations", ["consultations"]),

    formattedConsultations() {
      return this.consultations.map((cons) => {
        const patient = this.patients.find(({ id }) => id === cons.patientId);

        return {
          ...cons,
          patientName: patient
            ? `${patient.lastName} ${patient.firstName} ${
                patient.fatherName ?? ""
              }`
            : "Пациент не найден",
        };
      });
    },
  },

  methods: {
    ...mapActions("consultations", [
      "removeConsultation",
      "getConsultations",
      "editConsultation",
    ]),

    opentEditForm(consultation) {
      this.editedConsultation = consultation;
      this.consultationEditFormVisible = true;
    },

    handleEdit(form) {
      this.editConsultation(form).then((response) => {
        if (response.ok) {
          this.closeForm();
          this.getConsultations();
        }
      });
    },

    closeForm() {
      this.consultationEditFormVisible = false;
      this.editedConsultation = {};
    },

    remove({ id }) {
      this.$confirm(
        "Вы действительно хотите удалить консультацию",
        "Удаление консультации",
        {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          type: "warning",
        }
      ).then(() => {
        this.removeConsultation({ id }).then((response) => {
          if (response.ok) {
            this.getConsultations();
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.column-symptoms {
  word-break: normal;
}
</style>
