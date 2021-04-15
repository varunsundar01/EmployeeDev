<template>
  <base-card>
    <the-banner v-if="$store.getters['auth/getError'].authError && submitted">{{
      $store.getters["auth/getError"].errorMessage
    }}</the-banner>

    <h1 class="title">Create your Account</h1>
    <form-element
      inputStyle="input"
      inputType="email"
      @enteredInput="enteredInput"
      id="email"
      @change="emailCheck"
      @removeError="removeError('emailValidate')"
      :fieldError="emailError"
      :isError="emailValidate"
      >Email</form-element
    >
    <form-element
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      id="employeeNumber"
      @change="employeeNumberCheck"
      @removeError="removeError('employeeNumberValidate')"
      :fieldError="employeeNumberError"
      :isError="employeeNumberValidate"
      >Employee Number</form-element
    >

    <div class="department">
      <label for="departmentName">Department</label>
      <select
        name="departmentName"
        id="departmentName"
        :class="{ 'error-input': departmentNameValidate }"
        @blur="removeError('departmentNameValidate')"
        v-model="signUp.departmentName"
      >
        <option value="Tooling Products">Tooling Products</option>
        <option value="Application Engineering">Application Engineering</option>
        <option value="Machine Engineering">Machine Engineering</option>
        <option value="Manufacturing &amp; Assembly"
          >Manufacturing &amp; Assembly</option
        >
      </select>
    </div>

    <form-element
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      id="firstName"
      :isError="firstNameValidate"
      @removeError="removeError('firstNameValidate')"
      >First Name</form-element
    >
    <form-element
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      id="lastName"
      :isError="lastNameValidate"
      @removeError="removeError('lastNameValidate')"
      >Last Name</form-element
    >
    <form-element
      inputStyle="input"
      inputType="password"
      @enteredInput="enteredInput"
      @change="validatePassword"
      id="password"
      :fieldError="passwordError"
      :isError="passwordValidate"
      @removeError="removeError('passwordValidate')"
      >Password</form-element
    >
    <form-element
      inputStyle="input"
      inputType="password"
      @enteredInput="enteredInput"
      @change="validatePassword"
      id="password2"
      :fieldError="passwordError"
      :isError="password2Validate"
      @removeError="removeError('password2Validate')"
      >Confirm Password</form-element
    >

    <base-button @toNext="registerUser" primaryVisible="true">
      <template v-slot:primary>Create Account</template>
    </base-button>
  </base-card>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import TheBanner from "../../components/UI/TheBanner.vue";
export default {
  components: {
    TheBanner,
  },
  setup() {
    window.scrollTo(0, 0);
    const store = useStore();

    const signUp = reactive({
      email: "",
      employeeNumber: "",
      departmentName: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
    });

    let passwordError = ref("");
    let emailError = ref("");
    let employeeNumberError = ref("");
    let submitted = ref(false);

    let emailValidate = computed(() => {
      return (
        submitted.value && !store.getters["auth/getValidation"].emailValidate
      );
    });
    let employeeNumberValidate = computed(() => {
      return (
        submitted.value &&
        !store.getters["auth/getValidation"].employeeNumberValidate
      );
    });
    let departmentNameValidate = computed(() => {
      return (
        submitted.value &&
        !store.getters["auth/getValidation"].departmentNameValidate
      );
    });
    let firstNameValidate = computed(() => {
      return (
        submitted.value &&
        !store.getters["auth/getValidation"].firstNameValidate
      );
    });
    let lastNameValidate = computed(() => {
      return (
        submitted.value && !store.getters["auth/getValidation"].lastNameValidate
      );
    });
    let passwordValidate = computed(() => {
      return (
        submitted.value && !store.getters["auth/getValidation"].passwordValidate
      );
    });
    let password2Validate = computed(() => {
      return (
        submitted.value &&
        !store.getters["auth/getValidation"].password2Validate
      );
    });

    function enteredInput(data) {
      for (let input in signUp) {
        if (input === data.id) {
          signUp[input] = data.value.trim();
        }
      }
    }

    function emailCheck(event) {
      //Reset Email Error before check
      emailError.value = "";
      let input = event.target.value;
      if (!input.includes("@") && input.trim() !== "") {
        store.dispatch("auth/setError", {
          authError: true,
          errorMessage: "Enter a valid email address",
        });
        emailError.value = "Enter a valid email address";
        store.dispatch("setValidation", {
          field: "emailValidate",
          value: false,
        });
      }
    }
    function employeeNumberCheck(event) {
      //Reset Employee Number Error before check
      employeeNumberError.value = "";
      let input = event.target.value;
      if (input.trim().length > 6) {
        store.dispatch("auth/setError", {
          authError: true,
          errorMessage:
            "Employee Number too long. Employee Number should be less than 6 characters",
        });
        employeeNumberError.value =
          "Employee Number too long. Employee Number should be less than 6 characters";
        store.dispatch("setValidation", {
          field: "employeeNumberValidate",
          value: false,
        });
      }
    }

    function validatePassword() {
      //Reset Password Error before check
      passwordError.value = "";

      //Checking password inputs if password and confirm password have been entered
      if (signUp.password.length > 0 && signUp.password2.length > 0) {
        if (signUp.password.length < 8) {
          store.dispatch("auth/setError", {
            authError: true,
            errorMessage:
              "Password too short. Password should be at least 8 characters.",
          });
          passwordError.value =
            "Password too short. Password should be at least 8 characters.";
        } else if (signUp.password !== signUp.password2) {
          store.dispatch("auth/setError", {
            authError: true,
            errorMessage: "Passwords do not match",
          });
          passwordError.value = "Passwords do not match";
        }
      }
    }

    function removeError(field) {
      store.dispatch("auth/setValidation", {
        field,
        value: true,
      });
    }

    function registerUser() {
      store.dispatch("auth/resetMessages");
      submitted.value = false;
      if (
        passwordError.value === "" &&
        emailError.value === "" &&
        employeeNumberError.value === ""
      ) {
        store.dispatch("auth/setError", {
          authError: false,
          errorMessage: "",
        });

        submitted.value = true;
        store.dispatch("auth/registerUser", signUp);
      }
    }

    return {
      enteredInput,
      signUp,
      passwordError,
      emailError,
      employeeNumberError,
      emailValidate,
      employeeNumberValidate,
      departmentNameValidate,
      firstNameValidate,
      lastNameValidate,
      passwordValidate,
      password2Validate,
      validatePassword,
      emailCheck,
      employeeNumberCheck,
      submitted,
      removeError,
      registerUser,
    };
  },
};
</script>

<style scoped>
.department {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
}

select {
  font-size: 1.1em;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

select:focus {
  outline: none;
  box-shadow: 0 0 5pt 1pt var(--primary);
}

.password-instructions {
  margin-bottom: 1.5em;
}

.password-instructions p {
  margin: 0;
  font-size: 0.85em;
  color: var(--secondary);
}

.error-input {
  border: 1px solid #dc3545;
}

.error-input:focus {
  outline: none;
  box-shadow: 0 0 5pt 1pt #dc3545;
}
</style>
