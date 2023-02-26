<template>
  <el-form ref="consultationForm" class="consultation-form" :model="form" :rules="rules" label-width="140px">
    <el-form-item label="Пациент" prop="patientId">
      <el-select v-model="form.patientId" placeholder="Выберите пациента" no-data-text="Нет пациентов">
        <el-option
          v-for="patient in patients"
          :key="patient.id"
          :label="`${patient.lastName} ${patient.firstName} ${patient.fatherName ?? ''}`"
          :value="patient.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Дата" prop="date">
      <el-date-picker
        v-model="form.date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="Выберите дату"
        :picker-options="{ disabledDate, firstDayOfWeek: 1 }"
      />
    </el-form-item>

    <el-form-item label="Время" prop="time">
      <el-time-select
        v-model="form.time"
        placeholder="Выберите время"
        :picker-options="{
          start: '08:00',
          step: '00:15',
          end: '20:00',
          minTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        }"
      />
    </el-form-item>

    <el-form-item label="Симптомы" prop="symptoms">
      <el-input type="textarea" v-model="form.symptoms" />
    </el-form-item>

    <div class="actions">
      <el-button @click="$emit('close')">Отмена</el-button>
      <el-button type="primary" @click="onSubmit('consultationForm')">
        {{ editedConsultation ? "Редактировать" : "Добавить" }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ConsultationsForm",

  props: {
    editedConsultation: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: {
        date: "",
        time: "",
        symptoms: "",
        patientId: null,
      },
    };
  },

  computed: {
    ...mapState("patients", ["patients"]),
    ...mapState("consultations", ["consultations"]),

    rules() {
      return {
        patientId: [{ required: true, message: "Обязательное поле" }],
        date: [{ required: true, message: "Обязательное поле" }],
        time: [{ required: true, trigger: "blur", validator: this.validateTime }],
        symptoms: [],
      };
    },
  },

  created() {
    if (this.editedConsultation) {
      this.form = JSON.parse(JSON.stringify(this.editedConsultation));
    }
  },

  methods: {
    ...mapActions("consultations", ["addConsultation", "getConsultations"]),

    disabledDate(time) {
      return time.getTime() < Date.now() - 86400000;
    },

    validateTime(_, value, callback) {
      if (!value) {
        callback(new Error("Обязательное поле"));
      }

      const foundConsultingAtTheSameTime = this.consultations.find(
        ({ date, time, patientId }) =>
          patientId === this.form.patientId && date === this.form.date && time === this.form.time
      );

      if (foundConsultingAtTheSameTime) {
        callback(new Error("Это время уже используется этим пациентом"));
      }
    },

    timeToMinutes(time) {
      return parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3));
    },

    onSubmit(formName) {
      let isValid;

      this.$refs[formName].validate((valid) => {
        isValid = valid;
      });

      if (isValid !== false) {
        if (this.editedConsultation) {
          this.$emit("edit", this.form);
        } else {
          this.addConsultation(this.form).then((response) => {
            if (response.ok) {
              this.getConsultations();
              this.$emit("close");
            }
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}
</style>
