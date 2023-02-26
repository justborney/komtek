<template>
  <el-form
    ref="patientForm"
    class="patients-form"
    :model="form"
    :rules="rules"
    label-width="140px"
  >
    <el-form-item label="Фамилия" prop="lastName">
      <el-input v-model="form.lastName" placeholder="Фамилия"></el-input>
    </el-form-item>

    <el-form-item label="Имя" prop="firstName">
      <el-input v-model="form.firstName" placeholder="Имя"></el-input>
    </el-form-item>

    <el-form-item label="Отчество" prop="fatherName">
      <el-input v-model="form.fatherName" placeholder="Отчество"></el-input>
    </el-form-item>

    <el-form-item label="Дата рождения" prop="brithDate">
      <el-date-picker
        type="date"
        placeholder="Выберите дату"
        value-format="yyyy-MM-dd"
        v-model="form.brithDate"
      />
    </el-form-item>

    <el-form-item label="Пол" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="male">Мужской</el-radio>
        <el-radio label="female">Женский</el-radio>
        <el-radio label="pidaras">Не скажу</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="СНИЛС" prop="SNILS">
      <el-input v-model="form.SNILS" placeholder="***-***-*** **"></el-input>
    </el-form-item>

    <el-form-item label="Вес, кг" props="weight">
      <el-input v-model="form.physiologicalData.weight"></el-input>
    </el-form-item>

    <el-form-item label="Рост, см" props="height">
      <el-input v-model="form.physiologicalData.height"></el-input>
    </el-form-item>

    <el-form-item label="Возраст" prop="age">
      <el-input v-model="form.physiologicalData.age"></el-input>
    </el-form-item>

    <div class="actions">
      <el-button @click="$emit('close')">Отмена</el-button>
      <el-button type="primary" @click="onSubmit('patientForm')">
        {{ editedPatient ? "Редактировать" : "Добавить" }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
import validateSnils from "@/utils/validateSnils.js";

export default {
  name: "PatientsForm",

  props: {
    editedPatient: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        fatherName: "",
        brithDate: "",
        sex: "",
        SNILS: null,
        physiologicalData: {
          weight: null,
          height: null,
          age: null,
        },
      },
    };
  },

  computed: {
    rules() {
      return {
        lastName: [{ required: true, message: "Обязательное поле" }],
        firstName: [{ required: true, message: "Обязательное поле" }],
        fatherName: [{}],
        brithDate: [{ required: true, message: "Обязательное поле" }],
        sex: [{ required: true, message: "Обязательное поле" }],
        SNILS: [
          {
            validator: validateSnils,
            trigger: "blur",
            required: true,
          },
        ],
        physiologicalData: {
          weight: [],
          height: [],
          age: [],
        },
      };
    },
  },

  created() {
    if (this.editedPatient) {
      this.form = JSON.parse(JSON.stringify(this.editedPatient));
    }
  },

  methods: {
    ...mapActions("patients", ["addPatient", "getPatients"]),

    onSubmit(formName) {
      // Тестовый снилс: 95431468323;
      // Костыль, valid ничего не возвращает, если все поля валидны. Дрянь, тварь, мразь
      let isValid;

      this.$refs[formName].validate((valid) => {
        isValid = valid;
      });

      if (isValid !== false) {
        if (this.editedPatient) {
          this.$emit("edit", this.form);
        } else {
          this.addPatient(this.form).then((response) => {
            if (response.ok) {
              this.getPatients();
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
