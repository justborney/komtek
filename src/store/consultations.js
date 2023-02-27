export default {
  namespaced: true,

  state: {
    consultations: [],
  },

  mutations: {
    // Мутация для установки списка консультаций
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations;
    },
  },

  actions: {
    getConsultations({ commit }) {
      // Запрос для получения списка консультаций
      fetch(`http://${process.env.VUE_APP_ROOT_API}/consultations`)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_CONSULTATIONS", data); // Вызов мутации для установки списка консультаций в сторе
        })
        .catch((err) => console.error(err));
    },

    addConsultation(_, data) {
      // Добавление консультации
      return fetch(`http://${process.env.VUE_APP_ROOT_API}/consultations`, {
        method: "POST",
        body: JSON.stringify({
          id: Math.floor(Math.random() * 999999),
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    editConsultation(_, data) {
      // Редактирование консультации
      return fetch(`http://${process.env.VUE_APP_ROOT_API}/consultations/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    removeConsultation(_, { id }) {
      // Удаление консультации
      return fetch(`http://${process.env.VUE_APP_ROOT_API}/consultations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};
