<template>
  <div class="form-element">
    <label :for="id"><slot></slot></label>
    <textarea
      v-if="inputStyle === 'textarea'"
      :class="{ 'error-input': isError }"
      @input="enteredInput"
      @blur="removeError"
      :id="id"
      cols="30"
      rows="5"
      :placeholder="placeholder"
      ></textarea
    >
    <input
      v-else-if="inputStyle === 'input'"
      :type="inputType"
      :placeholder="placeholder"
      @input="enteredInput"
      :id="id"
      @blur="removeError"
      :class="{ 'error-input': isError }"
    />
    <div v-else-if="inputStyle === 'currency'" class="currency-input">
      <input
        type="number"
        @input="enteredInput"
        :id="id"
        :placeholder="placeholder"
        @blur="removeError"
        :class="{ 'error-input': isError }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "inputStyle",
    "inputType",
    "placeholder",
    "isError"
  ],
  emits: ["enteredInput", "removeError"],
  setup(_, context) {
    function enteredInput(event) {
      context.emit("enteredInput", {
        value: event.target.value,
        id: event.path[0].id,
      });
    }

    function removeError() {
      context.emit("removeError");
    }

    return {
      enteredInput,
      removeError,
    };
  },
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
  font-size: 1em;
  transition: all 0.2s ease-in-out;
}

textarea:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 5pt 1pt var(--primary);
}

.currency-input {
  display: flex;
  position: relative;
}

.currency-input input {
  padding-left: 1.5em;
  width: 30%;
}

.currency-input::before {
  content: "$";
  opacity: 0.6;
  font-weight: 300;
  position: absolute;
  top: 0.6em;
  left: 0.5em;
}

.error-input {
  border: 1px solid #dc3545;
}

.error-input:focus {
  outline: none;
  box-shadow: 0 0 5pt 1pt #dc3545;
}
</style>
