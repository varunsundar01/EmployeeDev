<template>
  <base-card>
    <the-banner v-if="errorActive"
      >All fields are required. Please complete the fields highlighted
      below</the-banner
    >
    <form-element
      id="projectName"
      inputStyle="input"
      :isError="projectNameValidation"
      @change="nameCheck"
      @removeError="removeError('projectNameValidation')"
      type="text"
      placeholder="Enter Project Name"
      @enteredInput="enteredInput"
      :fieldError="$store.getters['projects/nameError']"
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
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TheBanner from "../../components/UI/TheBanner";
export default {
  components: {
    TheBanner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const processFields = reactive({
      projectName: "",
      problem: "",
      solution: "",
      implementation: "",
    })

    onMounted(() => {
      store.dispatch("projects/loadProjects");
    });

    function enteredInput(event) {
      for (let field in processFields) {
        if (field === event.id) {
          processFields[field] = event.value;
        }
      }
    }

    function nameCheck(event) {
      //Check if project name is unique in database
      store.dispatch("projects/projectNameValidation", event.target.value);
    }

    function removeError(term) {
      store.dispatch("projects/setValidation", { term: term, value: true });
    }

    function onSubmit() {
      //Reset form validation before check
      for (let field in processFields) {
        store.dispatch("projects/setValidation", {
          term: `${field}Validation`,
          value: false,
        });
      }

      //Submit
      store.dispatch("projects/onSubmit", {
        type: "process-details",
        fields: processFields,
        fieldsValidation: "getProcessValidation",
      });

      //Go to Next Page if no errors
      if (!store.getters['projects/checkError'] && store.getters['projects/nameError'] === "") {
        router.push("/benefits-savings");
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters['projects/checkError'];
    });

    let projectNameValidation = computed(() => {
      if (store.getters['projects/checkError']) {
        return !store.getters['projects/getProcessValidation'].projectNameValidation;
      }
      return false;
    });
    let problemValidation = computed(() => {
      if (store.getters['projects/checkError']) {
        return !store.getters['projects/getProcessValidation'].problemValidation;
      }
      return false;
    });
    let solutionValidation = computed(() => {
      if (store.getters['projects/checkError']) {
        return !store.getters['projects/getProcessValidation'].solutionValidation;
      }
      return false;
    });
    let implementationValidation = computed(() => {
      if (store.getters['projects/checkError']) {
        return !store.getters['projects/getProcessValidation'].implementationValidation;
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
      nameCheck,
    };
  },
};
</script>
