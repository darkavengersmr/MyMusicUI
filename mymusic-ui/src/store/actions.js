import VueCookies from "vue-cookies";

import api from "../api";

export default {
  registerUser(context, obj) {
    api.registerNewUser(obj).then(() => {      
      context.dispatch("getToken", {
        username: obj.username,
        password: obj.password,
      });
    });
  },
  async getToken(context, { username, password }) {
    api
      .readToken({ username: username, password: password })
      .then(function (response) {
        if (response != undefined && response.status === 200) {
          context.commit("setAuthorized", true);
          context.commit("setUsername", username);
          context.commit("setPassword", password);
          context.commit("setToken", response.data.access_token);
          if (response.data.access_token.length > 10) {
            VueCookies.set("username", username, -1);
            VueCookies.set("token", response.data.access_token, -1);
            context.commit("setToken", response.data.access_token);

            if (username == "demo") {
              context.commit("setIsDemo", true);
            }
          }
          context.commit("setLoginOrRegistrationError", "");
        }
      })
      .catch(function () {
        context.commit(
          "setLoginOrRegistrationError",
          "Имя пользователя или пароль некорректны"
        );
        context.commit("setAuthorized", false);
      });
  },
  getTokenFromCookie(context) {
    let token;
    if (this.state.auth.token == "") {
      token = VueCookies.get("token");
    }
    if (token) {
      context.commit("setToken", token);
    }
    return token;
  },
  getStatus(context, token) {
    return api
      .readStatus({ token: token, params: { operation: "status" } })
      .then((response) => {
        if (response.data.operation == "status: stop") {
          context.commit("setPlayback", false);
        } else {
          context.commit("setPlayback", true);
        }
        context.commit("setAuthorized", true);
        context.commit("setUsername", response.data.username);
        context.commit("setFilters", {mode: response.data.mode,
          genre: response.data.genre,
          artist: response.data.artist,
          year: response.data.year,
          mood: response.data.mood,
          favorite: response.data.favorite,
        });
        context.commit("setNowPlay", response.data.now_play);
        

        if (response.data.username == "demo") {
          context.commit("setIsDemo", true);
        }

        return response;
      })
      .catch((error) => error);
  },
  controlPlayback(context, { token: token, operation: operation }) {
    return api
      .readStatus({ token: token, params: { operation: operation } })
      .then((response) => {
        if (response.data.operation == "stop ok") {
          context.commit("setPlayback", false);
        }
        if (response.data.operation == "play ok") {
          context.commit("setPlayback", true);
        }
        return response;
      })
      .catch((error) => error);
  },
  getObj(context, { url, storepoint, params }) {
    return api
      .readObject({ token: this.state.auth.token, url: url, params: params })
      .then((response) => {        
        context.commit(storepoint, response.data.result);
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit("setAuthorized", false);
          return error;
        }
      });
  },
  createObj(context, { url, params }) {
    api
      .createObject({
        token: this.state.auth.token,
        url: url,
        params: params,
      })
      .then(() => {})
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit("setAuthorized", false);
        }
      });
  },
  confirmNowPlay(context, { now_play }) {
    if (now_play.length > 10) {
      const pos = now_play.indexOf('|')   
      const like = now_play.slice(pos+1);
      context.commit("setNowPlay", now_play.slice(0, pos-1));
      context.commit("setLike", like);
    }
    else {
        context.commit("setNowPlay", "Поймай свою волну");
    }
    api
      .deleteObject({
        token: this.state.auth.token,
        url: "/now_play",
      })
      .then(() => {})
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit("setAuthorized", false);
        }
      });
  },
  getOptions(context) {
    return api
      .readObject({ token: this.state.auth.token, url: '/options' })
      .then((response) => {        
        context.commit('setPrefs', response.data);
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit("setAuthorized", false);
          return error;
        }
      });
  },
  setOptions(context) {
    return api
      .updateOptions({ token: this.state.auth.token, url: '/options', obj: this.state.prefs })      
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit("setAuthorized", false);
          return error;
        }
      });
  },
};
