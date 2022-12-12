import AuthenticationService from "@/services/Auth/authentication.services";

export default {
  namespaced: true,
  state: {
    CURRENT_TOKEN: localStorage.getItem("token") || null,
    CURRENT_USER: localStorage.getItem("user") || null,
    lang: localStorage.getItem("lang") || "en",
  },
  getters: {
    auth_user_info() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user;
    },
    auth_user_id() {
      let user_id = JSON.parse(localStorage.getItem("user"));
      return user_id.id;
    },
    isLogged(state) {
      return !!state.CURRENT_TOKEN;
    },
    AUTHINTICATED(state) {
      return state.CURRENT_TOKEN && state.CURRENT_USER;
    },
    USER(state) {
      return state.CURRENT_USER;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.CURRENT_TOKEN = payload;
      localStorage.setItem("token", JSON.stringify(payload));
      // axios.defaults.headers.common.Authorization = `Bearer ${payload}`;
    },
    SET_USER(state, payload) {
      state.CURRENT_USER = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    SET_LANG(state, payload) {
      state.lang = payload;
      localStorage.setItem("lang", "en");
    },
    UPDATE_INFO_PROFILE(state, payload) {
      state.CURRENT_USER = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      window.location.pathname = "/personal-profile";
    },

    removeUserToken(state) {
      state.CURRENT_TOKEN = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    logout(state) {
      state.CURRENT_TOKEN = null;
      state.CURRENT_USER = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.pathname = "/";
    },
  },
  actions: {
    // function Login
    LOGIN_USER({ commit }, data) {
      return AuthenticationService.login(data).then((response) => {
        if (response.status === 200) {
          commit("SET_TOKEN", response.data.data.remember_token);
          commit("SET_USER", response.data.data);
          commit("SET_LANG", "en");
        }
        return response;
      });
    },
    // function Register
    REGISTER_USER({ commit }, data) {
      return AuthenticationService.register(data).then((response) => {
        if (response.status === 201) {
          commit("SET_TOKEN", response.data.data.remember_token);
          commit("SET_USER", response.data.data);
          commit("SET_LANG", "en");
        }
        return response;
      });
    },

    LOGIN_USER_OTHER_APP({ commit }, data) {
      return AuthenticationService.loginwithotherapp(data).then((response) => {
        if (response.status === 200) {
          commit("SET_TOKEN", response.data.data.remember_token);
          commit("SET_USER", response.data.data);
          commit("SET_LANG", "en");
        }
        return response;
      });
    }
  },
};
