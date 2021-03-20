<template>
  <div class="form-element">
    <label :for="id"><slot></slot></label>
    <textarea
      v-if="inputStyle === 'textarea'"
      :id="id"
      cols="30"
      rows="5"
      :placeholder="placeholder"
    ></textarea>
    <input v-else :type="inputType" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: ["id", "inputStyle", "inputType", "placeholder"],
};
</script>

<style scoped>
.form-element {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

label {
  font-weight: 500;
  font-size: 1.25em;
}

textarea,
input {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 300;
  padding: 0.5em;
  transition: all 0.2s ease-in-out;
}

textarea:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 2pt 1pt #6f59df;
}
</style>
