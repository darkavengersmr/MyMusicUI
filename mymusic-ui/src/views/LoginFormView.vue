<template>
  <div class="card">
    <LoginForm
      :username="auth.username"
      @clickBtnLogin="
        getToken({
          username: $event.username,
          password: $event.password,
        })
      "
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginFormView",
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      auth: "auth",
    }),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getToken: "getToken",
    }),
  },
};
</script>
