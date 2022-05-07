import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state() {
    return {
      isMobile: true,
      isDemo: false,
      authorized: false,
      register: false,
      loginOrRegistrationError: "",
      auth: {
        username: "",
        password: "",
        token: "",
      },
      user: {},
      playback: false,
      now_play: "Поймай свою волну",
      genres: [],
      artists_by_genre: [],
      years: [],
      moods: [
        "Энергичное",
        "Спокойное",
        "Радостное",
        "Грустное",
        "Расслабленное",
        "Мрачное",
        "Мечтательное",
        "Сентиментальное",
        "Эпичное",
        "Рабочее",
        "Бодрое",
        "Мистическое",
        "Романтическое",        
      ],
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
});
