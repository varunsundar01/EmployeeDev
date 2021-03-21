<template>
  <base-card>
    <form>
      <form-element
        id="problem"
        inputStyle="textarea"
        placeholder="Describe the current problem"
        @enteredInput="enteredInput"
        >Problem Statement</form-element
      >
      <form-element
        id="solution"
        inputStyle="textarea"
        placeholder="Describe your proposed solution for the above problem"
        @enteredInput="enteredInput"
        >Proposed Solution</form-element
      >
      <form-element
        id="implementation"
        inputStyle="textarea"
        placeholder="Describe the implementation plan for the proposed solution"
        @enteredInput="enteredInput"
        >Implementation Method</form-element
      >
      <div class="button-group">
        <base-button primaryVisible="true" secondaryVisible="true">
          <template v-slot:secondary>Back</template>
          <template v-slot:primary>Next</template>
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { reactive } from "vue";
export default {
  props: ["isSecondary", "isPrimary", "id", "inputType", "placeholder"],
  emits: ["enteredInput"],
  setup() {
    const process = reactive({
      problem: "",
      solution: "",
      implementation: "",
    });
    function enteredInput(event) {
      Object.keys(process).find((key) => {
        if (key === event.id) {
          process[key] = event.value;
        }
      });
    }

    return {
      enteredInput,
    };
  },
};
</script>
