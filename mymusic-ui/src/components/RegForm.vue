<template>
  <div class="card">
    <div class="form">
      Имя
      <input
        class="login input"
        type="text"
        v-model="form_username"
        @keypress.enter="regUser"
      />
      <div />      
      Пароль
      <input
        class="login input"
        type="password"
        v-model="form_password"
        @keypress.enter="regUser"
      />
      <div />
      Приглашение
      <input
        class="login input"
        type="password"
        v-model="form_invite"
        @keypress.enter="regUser"
      />
    </div>

    <br />
    <div class="card">
      <button class="btn2 reg" @click="regUser">РЕГИСТРАЦИЯ</button>
    </div>    
    <div class="card">
      <button class="btn2 reg" @click="demoUser">ДЕМО-РЕЖИМ</button>
    </div>
    <div class="error">{{ loginOrRegistrationError }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    username: String,
    password: String,
  },
  emits: ["clickBtnReg", "clickBtnDemo"],
  data() {
    return {
      form_username: "",
      form_password: "",
      form_email: "",
      form_invite: "",
    };
  },
  computed: {
    ...mapState({
      loginOrRegistrationError: "loginOrRegistrationError",
      isDemo: "isDemo",
    }),
  },
  methods: {
    ...mapMutations({
      setLoginOrRegistrationError: "setLoginOrRegistrationError",
      setIsDemo: "setIsDemo",
    }),
    regUser() {
      if (this.form_username.length < 3) {
        this.setLoginOrRegistrationError(
          "Имя пользователя не может быть таким коротким"
        );
      } else if (this.form_email.length == 0) {
        this.setLoginOrRegistrationError("Email не может быть пустым");
      } else if (this.form_password.length < 3) {
        this.setLoginOrRegistrationError("Пароль не может быть таким коротким");
      } else if (this.form_invite.length < 3) {
        this.setLoginOrRegistrationError("Похоже у Вас нет приглашения");
      } else {
        this.$emit("clickBtnReg", {
          username: this.form_username,
          email: this.form_email,
          password: this.form_password,
          invite: this.form_invite,
        });
      }
    },
    demoUser() {
      this.setIsDemo(true);
      this.$emit("clickBtnDemo", {
        username: "demo",
        password: "demoP@$$w0rD",
      });
    },
  },
};
</script>

<style scoped>

.form {
  margin: 20px 0px 0px 0px;
}

.btn2.reg {
  font-size: 16px;
  background: black;
  border-color: white;
  border-width: 1px;
  color: rgb(255, 255, 255);
  width: 160px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 0px 0px 10px 0px;
}

.login.input {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 120px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0px 20px 0px;
  border: 0;
  box-shadow: none;
  margin: 10px 0px 2px 2px;
}

.error {
  font-size: 16px;
  color: rgb(255, 0, 0);
  margin: 16px 0px 0px 0px;
}
</style>
