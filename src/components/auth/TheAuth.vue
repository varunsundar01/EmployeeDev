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
    <base-button primaryVisible="true">
      <template v-slot:primary>Sign In</template>
    </base-button>
    <p class="auth-option">
      Don't have an account?
      <router-link to="/sign-up">Sign Up</router-link> instead
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    function enteredInput(data) {
      store.dispatch("auth/userAuth", data);
    }

    return {
      enteredInput,
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
