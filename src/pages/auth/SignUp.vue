<template>
  <base-card>
    <h1 class="title">Create your Account</h1>
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
      inputType="email"
      @enteredInput="enteredInput"
      id="email"
      >Email</form-element
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
      id="password"
      >Confirm Password</form-element
    >

    <base-button @toNext="onSubmit" primaryVisible="true">
        <template v-slot:primary>Create Account</template>
    </base-button>
  </base-card>
</template>

<style scoped>
.title {
    font-weight: 500;
    margin: 0.5em auto 1em auto;
}
</style>