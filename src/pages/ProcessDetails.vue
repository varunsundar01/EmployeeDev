<template>
  <base-card>
    <transition name="error">
      <error-banner v-if="errorActive"
        >All fields are required. Please complete the fields highlighted
        below</error-banner
      >
    </transition>
    <form-element
      id="projectName"
      inputStyle="input"
      :isError="projectNameValidate"
      @removeError="removeError('setProjectNameValidation')"
      type="text"
      placeholder="Enter Project Name"
      @enteredInput="enteredInput"
      >Project Name</form-element
    >
    <form-element
      id="problem"
      inputStyle="textarea"
      :isError="problemValidate"
      @removeError="removeError('setProblemValidation')"
      @enteredInput="enteredInput"
      placeholder="Describe the current problem"
      >Problem Statement</form-element
    >
    <form-element
      id="solution"
      inputStyle="textarea"
      :isError="solutionValidate"
      @removeError="removeError('setSolutionValidation')"
      placeholder="Describe your proposed solution for the above problem"
      @enteredInput="enteredInput"
      >Proposed Solution</form-element
    >
    <form-element
      id="implementation"
      inputStyle="textarea"
      :isError="implementationValidate"
      @removeError="removeError('setImplementationValidation')"
      placeholder="Describe the implementation plan for the proposed solution"
      @enteredInput="enteredInput"
      >Implementation Method</form-element
    >
    <div class="button-group">
      <base-button @toNext="onSubmit" primaryVisible="true">
        <template v-slot:primary>Next</template>
      </base-button>
    </div>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ErrorBanner from "../components/UI/ErrorBanner";
export default {
  components: {
    ErrorBanner,
  },
  props: ["isSecondary", "isPrimary", "id", "inputType", "placeholder"],
  emits: ["enteredInput"],
  setup() {
    const store = useStore();
    const router = useRouter();

    function enteredInput(event) {
      store.dispatch("process/enteredInput", event);
    }

    function onSubmit() {
      //Reset form validation before check
      store.dispatch("process/setProjectNameValidation", false);
      store.dispatch("process/setProblemValidation", false);
      store.dispatch("process/setSolutionValidation", false);
      store.dispatch("process/setImplementationValidation", false);

      //Submit
      store.dispatch("process/onSubmit");

      //Go to Next Page
      if (!store.getters["process/checkError"]) {
        router.push("/benefits-savings");
      }
    }

    function removeError(fieldAction) {
      store.dispatch(`process/${fieldAction}`, true);
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters["process/checkError"];
    });

    let projectNameValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        return !store.getters["process/getProcessValidation"]
          .projectNameValidate;
      }
      return false;
    });
    let problemValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        return !store.getters["process/getProcessValidation"].problemValidate;
      }
      return false;
    });
    let solutionValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        return !store.getters["process/getProcessValidation"].solutionValidate;
      }
      return false;
    });
    let implementationValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        return !store.getters["process/getProcessValidation"]
          .implementationValidate;
      }
      return false;
    });

    return {
      enteredInput,
      onSubmit,
      errorActive,
      projectNameValidate,
      problemValidate,
      solutionValidate,
      implementationValidate,
      removeError,
    };
  },
};
</script>

<style scoped>
.error-enter-from,
.error-leave-to {
  opacity: 0;
}

.error-enter-to,
.error-leave-from {
  opacity: 1;
}

.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
