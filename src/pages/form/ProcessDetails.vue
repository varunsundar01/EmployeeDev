<template>
  <base-card>
    <error-banner v-if="errorActive"
      >All fields are required. Please complete the fields highlighted
      below</error-banner
    >
    <form-element
      id="projectName"
      inputStyle="input"
      :isError="projectNameValidation"
      @removeError="removeError('projectNameValidation')"
      type="text"
      placeholder="Enter Project Name"
      @enteredInput="enteredInput"
      >Project Name</form-element
    >
    <form-element
      id="problem"
      inputStyle="textarea"
      :isError="problemValidation"
      @removeError="removeError('problemValidation')"
      @enteredInput="enteredInput"
      placeholder="Describe the current problem"
      >Problem Statement</form-element
    >
    <form-element
      id="solution"
      inputStyle="textarea"
      :isError="solutionValidation"
      @removeError="removeError('solutionValidation')"
      placeholder="Describe your proposed solution for the above problem"
      @enteredInput="enteredInput"
      >Proposed Solution</form-element
    >
    <form-element
      id="implementation"
      inputStyle="textarea"
      :isError="implementationValidation"
      @removeError="removeError('implementationValidation')"
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
import ErrorBanner from "../../components/UI/ErrorBanner";
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
      store.dispatch("enteredInput", event);
    }

    function onSubmit() {
      //Reset form validation before check
      store.dispatch("setValidation", {
        term: "projectNameValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "problemValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "solutionValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "implementationValidation",
        value: false,
      });

      //Submit
      store.dispatch("onSubmit", {
        fields: store.getters.getProcess,
        fieldsValidation: "getProcessValidation",
      });

      //Go to Next Page
      if (!store.getters.checkError) {
        router.push("/benefits-savings");
      }
    }

    function removeError(term) {
      store.dispatch("setValidation", { term: term, value: true });
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters.checkError;
    });

    let projectNameValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getProcessValidation.projectNameValidation;
      }
      return false;
    });
    let problemValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getProcessValidation.problemValidation;
      }
      return false;
    });
    let solutionValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getProcessValidation.solutionValidation;
      }
      return false;
    });
    let implementationValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getProcessValidation.implementationValidation;
      }
      return false;
    });

    return {
      enteredInput,
      onSubmit,
      errorActive,
      projectNameValidation,
      problemValidation,
      solutionValidation,
      implementationValidation,
      removeError,
    };
  },
};
</script>
