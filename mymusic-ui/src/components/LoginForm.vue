<template>
  <div class="card">
    <div class="form">
      Имя
      <input
        class="login input"
        type="text"
        v-model="form_username"
        @keypress.enter="loginTo"
      />
      <div></div>
      Пароль
      <input
        class="login input"
        type="password"
        v-model="form_password"
        @keypress.enter="loginTo"
      />
    </div>
    <br />
    <div class="card">
      <button class="btn2 login" @click="loginTo">ВХОД</button>
      <button class="btn2 login" @click="toRegister">РЕГИСТРАЦИЯ</button>      
    </div>
    <div class="error">{{ loginOrRegistrationError }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    username: String,
    password: String
  },
  emits: ['clickBtnLogin'],
  data() {
    return {
      form_username: this.username,
      form_password: this.password
    }
  },
  computed: {
    ...mapState({
      loginOrRegistrationError: 'loginOrRegistrationError'
    })
  },
  methods: {
    ...mapMutations({
      setRegister: "setRegister",
    }),
    loginTo() {
      this.$emit('clickBtnLogin', {
        username: this.form_username,
        password: this.form_password
      })
    },
    toRegister() {
      this.setRegister(true);
    }
  }
}
</script>

<style scoped>
.form {
  margin: 20px 0px 0px 0px;
}

.btn2.login {
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
