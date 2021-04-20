<template>
  <div>
    <the-banner v-if="showBanner">{{ bannerMessage }}</the-banner>
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
    <router-link class="auth-option-link" to="/forgot-password">Forgot Password?</router-link>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import TheBanner from "../UI/TheBanner.vue";
export default {
  components: {
    TheBanner,
  },
  setup() {
    const store = useStore();

    const user = reactive({
      email: "",
      password: "",
    });

    function enteredInput(data) {
      user[data.id] = data.value;
    }

    function signIn() {
      store.dispatch("auth/resetMessages");
      store.dispatch("auth/signIn", user);
    }

    let showBanner = computed(() => {
      if (
        store.getters["auth/getSubmitMessage"] !== "" ||
        store.getters["auth/getError"].authError
      ) {
        return true;
      }
      return false;
    });

    let bannerMessage = computed(() => {
      if (store.getters["auth/getSubmitMessage"] !== "") {
        return store.getters["auth/getSubmitMessage"];
      } else if (store.getters["auth/getError"].authError) {
        return store.getters["auth/getError"].errorMessage;
      } else {
        return "";
      }
    });

    return {
      enteredInput,
      signIn,
      showBanner,
      bannerMessage,
    };
  },
};
</script>

<style scoped>
.auth-option {
  font-weight: 300;
  text-align: center;
}

.auth-option-link {
  display: block;
  text-align: center;
}
</style>
