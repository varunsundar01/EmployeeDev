<template>
  <base-card>
    <form-element
      id="implementationCost"
      inputStyle="currency"
      @enteredInput="enteredInput"
      >Implementation Cost</form-element
    >
    <form-element
      id="costSavings"
      inputStyle="currency"
      @enteredInput="enteredInput"
      >Annual Cost Savings</form-element
    >
    <form-element
      id="timeToComplete"
      inputStyle="input"
      @enteredInput="enteredInput"
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
      placeholder="Enter Full Name"
      >Name</form-element
    >
    <form-element
      id="currentDate"
      inputStyle="input"
      inputType="date"
      @enteredInput="enteredInput"
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
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    function enteredInput(event) {
      store.dispatch("benefits/enteredInput", event);
    }

    function onSubmit() {
      router.push("/final-review");
    }

    function toBack() {
      router.push("/process-details");
    }

    return {
      onSubmit,
      enteredInput,
      toBack,
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
