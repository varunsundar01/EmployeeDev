<template>
  <base-card>
    <error-banner v-if="errorActive"
      >All fields are required. Please complete the fields highlighted
      below</error-banner
    >
    <form @submit.prevent>
      <form-element
        id="problem"
        inputStyle="textarea"
        :isError="problemValidate"
        @removeError="removeError('setProblemValidation')"
        placeholder="Describe the current problem"
        @enteredInput="enteredInput"
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
    </form>
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
      store.dispatch("process/setProblemValidation", false);
      store.dispatch("process/setSolutionValidation", false);
      store.dispatch("process/setImplementationValidation", false);

      //Submit
      store.dispatch("process/onSubmit");

      //Go to Next Page
      if (!store.getters["process/checkError"]) {
        router.push('/benefits-savings');
      }
    }

    function removeError(fieldAction) {
      store.dispatch(`process/${fieldAction}`, true);
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters["process/checkError"];
    });

    let problemValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return !store.getters["process/getProcessValidation"].problemValidate;
      }
      return false;
    });
    let solutionValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return !store.getters["process/getProcessValidation"].solutionValidate;
      }
      return false;
    });
    let implementationValidate = computed(() => {
      if (store.getters["process/checkError"]) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return !store.getters["process/getProcessValidation"]
          .implementationValidate;
      }
      return false;
    });

    return {
      enteredInput,
      onSubmit,
      errorActive,
      problemValidate,
      solutionValidate,
      implementationValidate,
      removeError,
    };
  },
};
</script>
