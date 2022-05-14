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
      prefs: {
        radio_effect: true,
      },
      user: {},
      playback: false,
      filters: {
        mode: null,
        genre: null,
        artist: null,
        year: null,
        mood: null
      },
      now_play: "Поймай свою волну",
      like: 'neutral',
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
      favorites: [
        "Мне нравятся",
        //"Любимые исполнители",        
        //"Любимые жанры",
        "Непрослушанные",
      ],
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
});
