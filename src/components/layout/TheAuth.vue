<template>
  <base-card>
    <form>
      <form-element inputStyle="input" inputType="text">
        Email
      </form-element>
      <form-element inputStyle="input" inputType="password">
        Password
      </form-element>
    </form>
    <base-button primaryVisible="true">
      <template v-slot:primary>Sign In</template>
    </base-button>
    <p class="auth-option">Don't have an account? Sign Up instead</p>
  </base-card>
</template>

<style scoped>
.auth-option {
  font-weight: 300;
  text-align: center;
}
</style>
