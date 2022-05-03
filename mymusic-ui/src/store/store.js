import { createStore } from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state() {
    return {
      isMobile: true,
      isDemo: false,
      authorized: false,
      loginOrRegistrationError: "",
      auth: {
        username: "",
        password: "",
        token: "",
      },
      user: {},
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})