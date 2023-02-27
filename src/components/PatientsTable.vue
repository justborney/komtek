<template>
  <div class="patients-table">
    <el-table
      :data="filteredPatients"
      border
      empty-text="Нет пациентов"
    >
      <el-table-column
        sortable
        prop="lastName"
        label="Фамилия"
      />
      <el-table-column
        sortable
        prop="firstName"
        label="Имя"
      />
      <el-table-column
        sortable
        prop="fatherName"
        label="Отчество"
      />
      <el-table-column
        sortable
        prop="brithDate"
        label="Дата рождения"
      />
      <el-table-column
        sortable
        prop="sex"
        label="Пол"
      />
      <el-table-column
        sortable
        prop="SNILS"
        label="СНИЛС"
      />
      <el-table-column
        align="center"
        label="Физиологические данные пациента"
      >
        <el-table-column
          sortable
          prop="physiologicalData.weight"
          label="Вес, кг"
        />
        <el-table-column
          sortable
          prop="physiologicalData.height"
          label="Рост, см"
        />
        <el-table-column
          sortable
          prop="physiologicalData.age"
          label="Возраст"
        />
      </el-table-column>
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
      title="Редактирование пациента"
      :visible.sync="patientEditFormVisible"
      width="30%"
    >
      <PatientsForm
        v-if="patientEditFormVisible"
        :edited-patient="editedPatient"
        @edit="handleEdit"
        @close="closeForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import PatientsForm from "@/components/PatientsForm.vue";

export default {
  name: "PatientsTable",

  components: { PatientsForm },

  // Props для передачи данных из родительского компонента
  props: {
    // Поисковый запрос
    searchedPatient: {
      type: String,
      default: "",
    },
  },

  // Локальные данные компонента
  data() {
    return {
      // Редактируемый пациент
      editedPatient: {},
      // Установка видимости формы редактирования пациента
      patientEditFormVisible: false,
    };
  },

  // Вычисляемые свойства
  computed: {
    // Вычисляемые свойства из хранилища patients
    ...mapState("patients", ["patients"]),

    // Фильтруем и форматируем пациентов по поисковому запросу
    filteredPatients() {
      return this.patients
        .filter(({ firstName, lastName, fatherName, SNILS }) => {
          return [firstName, lastName, fatherName, SNILS].some((field) => {
            return field.toLowerCase().includes(this.searchedPatient.toLowerCase());
          });
        })
        .map((patient) => {
          return {
            ...patient,
            SNILS: this.formatSnils(patient.SNILS),
          };
        });
    },
  },

  methods: {
    // Методы компонента: получение, редактирование, удаление
    ...mapActions("patients", ["getPatients", "editPatient", "removePatient"]),

    // Форматируем СНИЛС пациента
    formatSnils(SNILS) {
      let match = SNILS.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]} ${match[4]}`;
      }
      return null;
    },

    // Открытие формы редактирования пациента
    openEditForm(patient) {
      // Сохранение данных отредактированного пациента
      this.editedPatient = this.patients.find(({ id }) => id === patient.id);
      // Установка видимости формы редактирования пациента
      this.patientEditFormVisible = true;
    },

    // Редактирование пациента
    handleEdit(form) {
      this.editPatient(form).then((response) => {
        if (response.ok) {
          this.closeForm();
          this.getPatients();
        }
      });
    },

    // Удаление пациента
    remove({ id }) {
      this.$confirm("Вы действительно хотите удалить пациента", "Удаление пациента", {
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
        type: "warning",
      }).then(() => {
        this.removePatient({ id }).then((response) => {
          if (response.ok) {
            this.getPatients();
          }
        });
      });
    },

    // Закрытие формы редактирования пациента
    closeForm() {
      this.patientEditFormVisible = false;
      this.editedPatient = {};
    },
  },
};
</script>

<style scoped lang="scss">
.action {
  font-size: 1rem;
}
</style>
