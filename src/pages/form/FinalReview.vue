<template>
  <base-card>
    <div class="review-element">
      <label>Project Name</label>
      <p>{{ process.projectName }}</p>
    </div>
    <div class="review-element">
      <label>Problem Statement</label>
      <p>{{ process.problem }}</p>
    </div>
    <div class="review-element">
      <label>Proposed Solution</label>
      <p>{{ process.solution }}</p>
    </div>
    <div class="review-element">
      <label>Implementation Method</label>
      <p>{{ process.implementation }}</p>
    </div>
    <div class="review-element">
      <label>Implementation Cost</label>
      <p>${{ benefits.implementationCost }}</p>
    </div>
    <div class="review-element">
      <label>Annual Cost Savings</label>
      <p>${{ benefits.costSavings }}</p>
    </div>
    <div class="review-element">
      <label>Estimated Weeks to Completion</label>
      <p>{{ benefits.timeToComplete }}</p>
    </div>
    <base-button
      @toNext="finalSubmit"
      @toBack="toBack"
      primaryVisible="true"
      secondaryVisible="true"
    >
      <template v-slot:secondary>Back</template>
      <template v-slot:primary>Submit</template>
    </base-button>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const process = computed(() => {
      return JSON.parse(localStorage.getItem("process-details"));
    });
    const benefits = computed(() => {
      return JSON.parse(localStorage.getItem("benefits-savings"));
    });

    function finalSubmit() {
      const process = JSON.parse(localStorage.getItem("process-details"));
      const benefits = JSON.parse(localStorage.getItem("benefits-savings"));
      delete benefits.fullName;
      delete benefits.currentDate;

      const finalValues = Object.assign(process, benefits);

      store.dispatch("finalSubmit", finalValues);
      router.push("/dashboard");
    }

    function toBack() {
      router.push("/benefits-savings");
    }

    return {
      process,
      benefits,
      finalSubmit,
      toBack,
    };
  },
};
</script>

<style scoped>
.review-element {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
}

label {
  font-weight: 500;
  font-size: 1.35em;
}

p {
  font-size: 1.1em;
  margin: 0.25em 0 0 0;
}
</style>
