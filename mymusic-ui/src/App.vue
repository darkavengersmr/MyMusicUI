<template>
  <div v-if="isDemo" class="demo">ДЕМО-РЕЖИМ. ИЗМЕНЕНИЯ НЕ СОХРАНЯЮТСЯ</div>
  <img alt="MyMusic logo" class="logo" src="./assets/logo_wide.png" />
  <h3 class="title">Моя.Музыка</h3>
  <LoginForm
    v-if="!authorized && !register"
    @clickBtnLogin="
      getToken({
        username: $event.username,
        password: $event.password,
      })
    "
  />
  <RegForm v-if="!authorized && register" />
  <MainForm v-if="authorized" /> 
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import LoginForm from "./components/LoginForm.vue";
import MainForm from "./components/MainForm.vue";
import RegForm from "./components/RegForm.vue";

export default {
  name: "App",

  computed: {
    ...mapState({
      authorized: "authorized",
      register: "register",
      auth: "auth",
      user: "user",
      isMobile: "isMobile",
      isDemo: "isDemo",
    }),
  },
  methods: {
    ...mapMutations({
      setAuthorized: "setAuthorized",
      setToken: "setToken",
      setUserid: "setUserid",
      setIsMobile: "setIsMobile",
      setIsDemo: "setIsDemo",
    }),
    ...mapActions({
      getToken: "getToken",
      getTokenFromCookie: "getTokenFromCookie",
      getStatus: "getStatus",
    }),
    setViewport: function () {
      let viewportContent =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document
        .querySelector("meta[name='viewport']")
        .setAttribute("content", viewportContent);
    },
    isMobileOrDesktop() {
      //this.setWindowinnerWidth(window.innerWidth);

      if (window.innerWidth <= 900) {
        this.setIsMobile(true);
      } else {
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          this.setIsMobile(true);
        } else {
          this.setIsMobile(false);
        }
      }
    },
  },
  created() {
    //Detect window resize
    window.addEventListener("resize", this.setViewport);
    this.setViewport();
    this.getTokenFromCookie()
      .then((token) => {
        if (token) {
          return this.getStatus(token);
        } else {
          throw new Error("Cookie not found");
        }
      })     
      .catch(() => {
        return console.log("Cookie not found, please login");
      });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setViewport);
  },
  mounted() {
    this.isMobileOrDesktop();

    window.onresize = () => {
      this.isMobileOrDesktop();
    };
  },
  components: {
    RegForm,
    LoginForm,
    MainForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  margin: 20px 0px 0px 0px;
}

.title {
  margin: 0px 0px 10px 0px;
  color: white;
}
</style>
