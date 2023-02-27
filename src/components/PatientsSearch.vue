<template>
  <el-input
    v-model="searchedPatient"
    autofocus
    placeholder="Введите ФИО или СНИЛС"
  />
</template>

<script>
export default {
  name: "PatientsSearch",

  props: {
    value: {
      type: String,
      required: true,
    },
  },

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
