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

    return {
      process,
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