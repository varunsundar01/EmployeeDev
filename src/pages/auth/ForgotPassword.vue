<template>
  <div class="forgot-password">
    <base-card>
      <h1 class="title">Reset Password</h1>

      <div v-if="!submitted">
        <p class="reset-text">
          Enter the Email address associated with your account
        </p>
        <form @submit.prevent="forgotPassword">
          <form-element
            inputStyle="input"
            inputType="email"
            placeholder="Email Address"
            @enteredInput="enteredInput"
            :fieldError="fieldError"
            :isError="isError"
          ></form-element>

          <base-button primaryVisible="true">
            <template v-slot:primary>Submit</template>
          </base-button>
        </form>
      </div>
      <div class="confirm" v-else>
        <p>
          An email has been sent to you with the password reset instructions
        </p>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    let submitted = ref(false);
    const enteredEmail = ref("");
    const fieldError = ref("");

    let isError = computed(() => {
      return fieldError.value.trim().length === 0 && submitted.value;
    });

    function enteredInput(data) {
      enteredEmail.value = data.value;
    }

    function forgotPassword() {
      if (
        enteredEmail.value.trim().length > 0 &&
        enteredEmail.value.includes("@")
      ) {
        submitted.value = true;
      } else {
        fieldError.value = "Enter a valid email";
      }
    }

    return {
      enteredInput,
      forgotPassword,
      submitted,
      isError,
      fieldError,
    };
  },
};
</script>

<style scoped>
.forgot-password {
    height: 60vh;
}

.confirm {
  background-color: var(--success-background);
  color: var(--success-text);
  border: 1px solid var(--success-border);
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  padding: 0.5em 1.25em;
  text-align: center;
}

.confirm p {
  margin: 0;
  padding: 0;
}

.reset-text {
  margin: 0;
}
</style>
