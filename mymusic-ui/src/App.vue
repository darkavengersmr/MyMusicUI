<template>
  <div v-if="isDemo" class="demo">ДЕМО-РЕЖИМ. ИЗМЕНЕНИЯ НЕ СОХРАНЯЮТСЯ</div>
  <img v-if="!authorized" alt="MyMusic logo" class="logo" src="./assets/logo_wide.png">
  <h3 v-if="!authorized" class="title">Моя.Музыка</h3>
  <LoginForm v-if="authorized" />
  <RegForm v-if="authorized" />
  <MainForm v-if="!authorized" />  
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import LoginForm from './components/LoginForm.vue'
import MainForm from './components/MainForm.vue'
import RegForm from './components/RegForm.vue'

export default {
  name: 'App',
  computed: {
    ...mapState({
      authorized: "authorized",
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
      getObj: "getObj",
    }),
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
          if (this.authorized) {
            this.$router.push({ name: "outflow" });
          }
        }
      }
    },
  },
  mounted() {    
    this.isMobileOrDesktop();

    window.onresize = () => {
      this.isMobileOrDesktop();
    };
  },
  components: {
    RegForm, LoginForm, MainForm
  }
}
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
