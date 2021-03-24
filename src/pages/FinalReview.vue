<template>
  <base-card>
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
    <div class="review-element">
      <label>Additional Comments</label>
      <p>{{ benefits.comments }}</p>
    </div>
    <base-button @toNext="onSubmit" primaryVisible="true">
      <template v-slot:primary>Submit</template>
    </base-button>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const process = computed(() => {
      return store.getters["process/getProcess"];
    });
    const benefits = computed(() => {
      return store.getters["benefits/getBenefits"];
    });

    return {
      process,
      benefits,
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
  font-size: 1.25em;
}

p {
  font-weight: 300;
  font-size: 1em;
  margin: 0.25em 0 0 0;
}
</style>
