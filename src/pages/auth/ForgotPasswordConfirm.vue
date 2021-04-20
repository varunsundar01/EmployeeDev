<template>
  <base-card>
    <h1 class="title">Reset Password</h1>

    <the-banner v-if="$store.getters['auth/getError'].authError">{{$store.getters['auth/getError'].errorMessage}}</the-banner>

    <form @submit.prevent="confirmPasswordReset">
      <form-element
        @enteredInput="enteredInput"
        @removeError="removeError"
        inputStyle="input"
        inputType="password"
        :fieldError="fieldError"
        >New Password</form-element
      >
      <base-button primaryVisible="true">
        <template v-slot:primary>Reset Password</template>
      </base-button>
    </form>
  </base-card>
</template>

<script>
import { ref } from "vue";
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

    const newPassword = ref("");
    const fieldError = ref("");

    if (!route.query.req_u && !route.query.reset) {
      router.push("/forgot-password");
    }

    function enteredInput(data) {
      newPassword.value = data.value;
    }

    function removeError() {
      fieldError.value = "";
    }

    function confirmPasswordReset() {
      if (newPassword.value.length < 8) {
        fieldError.value = "Password too short";
      } else {
        store.dispatch("auth/confirmPasswordReset", {
          uidb64: route.query.req_u,
          token: route.query.reset,
          password: newPassword.value,
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
