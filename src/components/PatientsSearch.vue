<template>
  <el-input
    v-model="searchedPatient"
    autofocus
    placeholder="Введите ФИО или СНИЛС"
  />
</template>

<script>
/** Компонент для поиска пациента по имени и фамилии
 * Принимает на вход текущее значение поискового запроса
 * и передает его наружу через событие input
 * */
export default {
  name: "PatientsSearch",

  // Props для передачи данных из родительского компонента
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  // Вычисляемые свойства
  computed: {
    searchedPatient: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
