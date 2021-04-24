<template>
  <base-card>
    <h1 class="title">Reset Password</h1>

    <the-banner v-if="$store.getters['auth/getError'].authError">{{
      $store.getters["auth/getError"].errorMessage
    }}</the-banner>

    <form @submit.prevent="confirmPasswordReset">
      <form-element
        id="newPassword"
        @enteredInput="enteredInput"
        @removeError="removeError"
        inputStyle="input"
        inputType="password"
        :fieldError="fieldError"
        >New Password</form-element
      >
      <form-element
        id="newPassword2"
        @enteredInput="enteredInput"
        @removeError="removeError"
        inputStyle="input"
        inputType="password"
        :fieldError="fieldError"
        >Confirm New Password</form-element
      >
      <base-button primaryVisible="true">
        <template v-slot:primary>Reset Password</template>
      </base-button>
    </form>
  </base-card>
</template>

<script>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import TheBanner from "../../components/UI/TheBanner.vue";
export default {
  components: {
    TheBanner,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const passwords = reactive({
      newPassword: "",
      newPassword2: "",
    });
    const fieldError = ref("");

    if (!route.query.req_u && !route.query.reset) {
      router.push("/forgot-password");
    }

    function enteredInput(data) {
      passwords[data.id] = data.value;
    }

    function removeError() {
      fieldError.value = "";
    }

    function confirmPasswordReset() {
      if (passwords.newPassword.length < 8) {
        fieldError.value = "Password too short";
      } else if (passwords.newPassword !== passwords.newPassword2) {
        fieldError.value = "Passwords do not match";
      } else {
        store.dispatch("auth/confirmPasswordReset", {
          uidb64: route.query.req_u,
          token: route.query.reset,
          password: passwords.newPassword,
        });
      }
    }

    return {
      enteredInput,
      removeError,
      fieldError,
      confirmPasswordReset,
    };
  },
};
</script>
