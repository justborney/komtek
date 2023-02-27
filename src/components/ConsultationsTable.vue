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
      <el-table-column
        sortable
        prop="date"
        label="Дата"
        width="120"
      />
      <el-table-column
        sortable
        prop="time"
        label="Время"
        width="100"
      />
      <el-table-column
        sortable
        prop="symptoms"
        label="Симптомы"
      />
      <el-table-column
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            class="action"
            @click="openEditForm(scope.row)"
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

  // Указание компонентов, используемых внутри этого компонента
  components: { ConsultationsForm },

  // Локальные данные компонента
  data() {
    return {
      // Редактируемая консультация
      editedConsultation: {},
      consultationEditFormVisible: false,
    };
  },

  // Вычисляемые свойства
  computed: {
    // Вычисляемые свойства из хранилища patients
    ...mapState("patients", ["patients"]),
    // Вычисляемые свойства из хранилища consultations
    ...mapState("consultations", ["consultations"]),

    // Форматирование данных о консультациях и добавление имени пациента к каждой записи
    formattedConsultations() {
      return this.consultations.map((cons) => {
        // Поиск данных о пациенте, участвующем в консультации
        const patient = this.patients.find(({ id }) => id === cons.patientId);

        return {
          ...cons,
          patientName: patient
            ? `${patient.lastName} ${patient.firstName} ${patient.fatherName ?? ""}`
            : "Пациент не найден",
        };
      });
    },
  },

  // Методы компонента: получение, редактирование, удаление
  methods: {
    ...mapActions("consultations", [
      "getConsultations",
      "editConsultation",
      "removeConsultation",
    ]),

    // Открытие формы редактирования консультации
    openEditForm(consultation) {
      // Сохранение данных отредактированной консультации
      this.editedConsultation = consultation;
      // Установка видимости формы редактирования консультации
      this.consultationEditFormVisible = true;
    },

    // Обработка редактирования консультации
    handleEdit(form) {
      this.editConsultation(form).then((response) => {
        if (response.ok) {
          // Закрытие формы редактирования консультации
          this.closeForm();
          // Получение (обновление) списка консультаций
          this.getConsultations();
        }
      });
    },

    // Удаление консультации
    remove({ id }) {
      this.$confirm(
        "Вы действительно хотите удалить консультацию",
        "Удаление консультации",
        {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          type: "warning",
        },
      ).then(() => {
        this.removeConsultation({ id }).then((response) => {
          console.log(response);
          if (response.ok) {
            this.getConsultations();
          }
        });
      });
    },

    // Закрытие формы редактирования консультации
    closeForm() {
      // Установка видимости формы редактирования консультации
      this.consultationEditFormVisible = false;
      // Очистка данных отредактированной консультации
      this.editedConsultation = {};
    },
  },
};
</script>

<style scoped lang="scss">
.column-symptoms {
  word-break: normal;
}
</style>
