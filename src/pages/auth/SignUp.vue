<template>
  <base-card>
    <h1 class="title">Create your Account</h1>
    <form-element
      inputStyle="input"
      inputType="email"
      @enteredInput="enteredInput"
      id="email"
      >Email</form-element
    >
    <form-element
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      id="employeeNumber"
      >Employee Number</form-element
    >

    <div class="department">
      <label for="departmentName">Department</label>
      <select
        name="departmentName"
        id="departmentName"
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
      >First Name</form-element
    >
    <form-element
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      id="lastName"
      >Last Name</form-element
    >
    <form-element
      inputStyle="input"
      inputType="password"
      @enteredInput="enteredInput"
      id="password"
      >Password</form-element
    >
    <form-element
      inputStyle="input"
      inputType="password"
      @enteredInput="enteredInput"
      id="password2"
      >Confirm Password</form-element
    >

    <base-button @toNext="onSubmit" primaryVisible="true">
      <template v-slot:primary>Create Account</template>
    </base-button>
  </base-card>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    window.scrollTo(0, 0);
    const store = useStore();

    const signUp = reactive({
      email: "",
      employeeNumber: null,
      departmentName: null,
      firstName: '',
      lastName: '',
      password: '',
      password2: ''
    })

    function enteredInput(data) {
      for (let input in signUp) {
        if (input === data.id) {
          signUp[input] = data.value;
        }
      }
    }

    function onSubmit() {
      store.dispatch("auth/onSubmit", signUp);
    }

    return {
      enteredInput,
      signUp,
      onSubmit
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
</style>
