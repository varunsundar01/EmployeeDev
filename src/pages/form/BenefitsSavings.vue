<template>
  <base-card>
    <the-banner v-if="errorActive"
      >All fields are required. Please complete the fields highlighted
      below</the-banner
    >
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
      @removeError="removeError('fullNameValidation')"
      placeholder="Enter Full Name"
      >Name</form-element
    >
    <form-element
      id="currentDate"
      inputStyle="input"
      inputType="date"
      @enteredInput="enteredInput"
      @removeError="removeError('currentDateValidation')"
      :isError="currentDateValidation"
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
import { computed } from "vue";
import TheBanner from "../../components/UI/TheBanner";

export default {
  components: {
    TheBanner,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    function enteredInput(event) {
      store.dispatch("enteredInput", event);
    }

    function onSubmit() {
      //Reset form validation before check
      store.dispatch("setValidation", {
        term: "implementationCostValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "costSavingsValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "timeToCompleteValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "fullNameValidation",
        value: false,
      });
      store.dispatch("setValidation", {
        term: "currentDateValidation",
        value: false,
      });

      //Submit
      store.dispatch("onSubmit", {
        type: "benefits-savings",
        fields: store.getters.getBenefits,
        fieldsValidation: "getBenefitsValidation",
      });

      if (!store.getters.checkError) {
        router.push("/final-review");
      }
    }

    function toBack() {
      router.push("/process-details");
    }

    function removeError(term) {
      store.dispatch("setValidation", { term: term, value: true });
    }

    let errorActive = computed(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return store.getters.checkError;
    });

    let implementationCostValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getBenefitsValidation
          .implementationCostValidation;
      }
      return false;
    });
    let costSavingsValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getBenefitsValidation.costSavingsValidation;
      }
      return false;
    });
    let timeToCompleteValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getBenefitsValidation.timeToCompleteValidation;
      }
      return false;
    });
    let fullNameValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getBenefitsValidation.fullNameValidation;
      }
      return false;
    });
    let currentDateValidation = computed(() => {
      if (store.getters.checkError) {
        return !store.getters.getBenefitsValidation.currentDateValidation;
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
