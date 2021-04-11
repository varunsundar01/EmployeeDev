<template>
  <div>
    <form>
      <form-element
        inputStyle="input"
        inputType="email"
        @enteredInput="enteredInput"
        id="email"
      >
        Email
      </form-element>
      <form-element
        inputStyle="input"
        inputType="password"
        @enteredInput="enteredInput"
        id="password"
      >
        Password
      </form-element>
    </form>
    <base-button primaryVisible="true" @toNext="signIn">
      <template v-slot:primary>Sign In</template>
    </base-button>
    <p class="auth-option">
      Don't have an account?
      <router-link to="/sign-up">Sign Up</router-link> instead
    </p>
  </div>
</template>

<script>
import {reactive} from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const user = reactive({
      email: "",
      password: ""
    })

    function enteredInput(data) {
      user[data.id] = data.value;
    }

    function signIn() {
      store.dispatch("auth/signIn", user);
    }

    return {
      enteredInput,
      signIn
    };
  },
};
</script>

<style scoped>
.auth-option {
  font-weight: 400;
  text-align: center;
}
</style>
