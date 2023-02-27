export default {
  namespaced: true,

  state: {
    patients: [],
  },

  mutations: {
    // Мутация для установки списка пациентов
    SET_PATIENTS(state, patients) {
      state.patients = patients;
    },
  },

  actions: {
    /**
     * Получаем данные по пациентам с эндпоинта /patients
     * */
    getPatients({ commit }) {
      // Запрос для получения списка пациентов
      fetch("http://localhost:3000/patients")
        .then((response) => response.json())
        .then((data) => {
          commit("SET_PATIENTS", data);
        })
        .catch((err) => console.error(err));
    },

    addPatient(_, data) {
      // Добавление пациента
      return fetch("http://localhost:3000/patients", {
        method: "POST",
        body: JSON.stringify({
          id: Math.floor(Math.random() * 999999), // Присваивание уникального числа, чтобы запрос прошел (для json-server)
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    editPatient(_, data) {
      // Редактирование пациента
      return fetch(`http://localhost:3000/patients/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    removePatient(_, { id }) {
      // Удаление пациента
      return fetch(`http://localhost:3000/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};
