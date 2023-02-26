export default {
  namespaced: true,

  state: {
    consultations: [],
  },

  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations;
    },
  },

  actions: {
    getConsultations({ commit }) {
      fetch("http://localhost:3000/consultations")
        .then((response) => response.json())
        .then((data) => {
          commit("SET_CONSULTATIONS", data);
        })
        .catch((err) => console.error(err));
    },

    addConsultation(_, data) {
      return fetch("http://localhost:3000/consultations", {
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
      return fetch(`http://localhost:3000/consultations/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    removeConsultation(_, { id }) {
      return fetch(`http://localhost:3000/consultations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};
