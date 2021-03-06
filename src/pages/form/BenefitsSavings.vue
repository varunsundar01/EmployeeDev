<template>
  <base-card>
    <the-banner v-if="errorActive">{{
      $store.getters["projects/checkError"].errorMessage
    }}</the-banner>
    <form-element
      id="implementationCost"
      inputStyle="currency"
      @enteredInput="enteredInput"
      :isError="implementationCostValidation"
      @removeError="removeError('implementationCostValidation')"
      >Implementation Cost</form-element
    >
    <form-element
      id="costSavings"
      inputStyle="currency"
      @enteredInput="enteredInput"
      :isError="costSavingsValidation"
      @removeError="removeError('costSavingsValidation')"
      >Annual Cost Savings</form-element
    >
    <form-element
      id="timeToComplete"
      inputStyle="input"
      @enteredInput="enteredInput"
      :isError="timeToCompleteValidation"
      @removeError="removeError('timeToCompleteValidation')"
      inputType="number"
      placeholder="Enter estimated completion time (Enter 0 if project has been completed)"
      >Estimated Weeks to Completion</form-element
    >

    <p class="acknowledgement">
      By signing below you acknowledge that the information you entered is
      accurate to your knowledge and adheres to the company's corporate policy
    </p>

    <form-element
      id="fullName"
      inputStyle="input"
      inputType="text"
      @enteredInput="enteredInput"
      :isError="fullNameValidation"
      :fieldError="$store.getters['projects/fullNameError']"
      @removeError="removeError('fullNameValidation')"
      placeholder="Enter Full Name"
      >Full Name</form-element
    >
    <form-element
      id="currentDate"
      inputStyle="input"
      inputType="date"
      @enteredInput="enteredInput"
      @removeError="removeError('currentDateValidation')"
      :isError="currentDateValidation"
      :fieldError="$store.getters['projects/currentDateError']"
      >Today's Date</form-element
    >

    <div class="button-group">
      <base-button
        primaryVisible="true"
        @toNext="onSubmit"
        secondaryVisible="true"
        @toBack="toBack"
      >
        <template v-slot:primary>Review</template>
        <template v-slot:secondary>Back</template>
      </base-button>
    </div>
  </base-card>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import TheBanner from "../../components/UI/TheBanner";
import axios from "axios";

export default {
  components: {
    TheBanner,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const benefitsFields = reactive({
      implementationCost: null,
      costSavings: null,
      timeToComplete: null,
      fullName: "",
      currentDate: null,
    });

    window.scrollTo(0, 0);

    function enteredInput(event) {
      for (let field in benefitsFields) {
        if (field === event.id) {
          benefitsFields[field] = event.value;
        }
      }
    }

    function onSubmit() {
      //Reset form validation before check
      for (let field in benefitsFields) {
        store.dispatch("projects/setValidation", {
          term: `${field}Validation`,
          value: false,
        });
      }

      axios
        .get(`${process.env.VUE_APP_ROOT_API}/api/auth/employee`, {
          headers: {
            Authorization: `Token ${store.getters["auth/getToken"]}`,
          },
        })
        .then((response) => {
          const employeeName = `${response.data.first_name} ${response.data.last_name}`;
          const dateCheck =
            new Date().getDate() ===
              new Date(benefitsFields.currentDate).getUTCDate() &&
            new Date().getMonth() ===
              new Date(benefitsFields.currentDate).getUTCMonth() &&
            new Date().getFullYear() ===
              new Date(benefitsFields.currentDate).getFullYear();

          if (
            employeeName !== benefitsFields.fullName &&
            benefitsFields.fullName.trim() !== ""
          ) {
            const nameFieldError =
              "Full Name does not match records. Enter your full name associated with your account";
            store.dispatch("projects/fullNameError", nameFieldError);
          }

          if (!dateCheck && benefitsFields.currentDate !== null) {
            const dateFieldError = "Enter today's date";
            store.dispatch("projects/currentDateError", dateFieldError);
          }

          //Submit
          store.dispatch("projects/onSubmit", {
            type: "benefits-savings",
            fields: benefitsFields,
            fieldsValidation: "getBenefitsValidation",
          });

          if (
            !store.getters["projects/checkError"].errorActive &&
            store.getters["projects/fullNameError"] === "" &&
            store.getters["projects/currentDateError"] === ""
          ) {
            router.push("/final-review");
          }
        });
    }

    function toBack() {
      router.push("/process-details");
    }

    function removeError(term) {
      store.dispatch("projects/setValidation", { term: term, value: true });
      store.dispatch("projects/fullNameError", "");
      store.dispatch("projects/currentDateError", "");
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters["projects/checkError"].errorActive;
    });

    let implementationCostValidation = computed(() => {
      if (store.getters["projects/checkError"].errorActive) {
        return !store.getters["projects/getBenefitsValidation"]
          .implementationCostValidation;
      }
      return false;
    });
    let costSavingsValidation = computed(() => {
      if (store.getters["projects/checkError"].errorActive) {
        return !store.getters["projects/getBenefitsValidation"]
          .costSavingsValidation;
      }
      return false;
    });
    let timeToCompleteValidation = computed(() => {
      if (store.getters["projects/checkError"].errorActive) {
        return !store.getters["projects/getBenefitsValidation"]
          .timeToCompleteValidation;
      }
      return false;
    });
    let fullNameValidation = computed(() => {
      if (store.getters["projects/checkError"].errorActive) {
        return !store.getters["projects/getBenefitsValidation"]
          .fullNameValidation;
      }
      return false;
    });
    let currentDateValidation = computed(() => {
      if (store.getters["projects/checkError"].errorActive) {
        return !store.getters["projects/getBenefitsValidation"]
          .currentDateValidation;
      }
      return false;
    });

    return {
      onSubmit,
      enteredInput,
      toBack,
      errorActive,
      implementationCostValidation,
      costSavingsValidation,
      timeToCompleteValidation,
      fullNameValidation,
      currentDateValidation,
      removeError,
    };
  },
};
</script>

<style scoped>
.acknowledgement {
  opacity: 0.8;
  font-size: 0.8em;
  font-weight: 300;
  margin-top: 3em;
}
</style>
