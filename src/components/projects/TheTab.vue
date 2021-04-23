<template>
  <div class="tabs">
    <div class="tab-item">
      <p :class="{ active: currentRoute === '/process-details' }">
        Process Details
      </p>
    </div>
    <div class="tab-item">
      <p :class="{ active: currentRoute === '/benefits-savings' }">
        Benefits &amp; Savings
      </p>
    </div>
    <div class="tab-item">
      <p :class="{ active: currentRoute === '/final-review' }">Review</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
    setup() {
      const route = useRoute();
      let currentRoute = computed(() => {
        return route.path;
      });
      return {
        currentRoute,
      };
    },
};
</script>

<style>
.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
}

.tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2em;
}

.tab-item p {
  font-size: 1em;
  color: var(--inactive);
  margin: 0;
}

.active {
  color: var(--secondary) !important;
  border-bottom: 2px solid var(--active);
}

@media(max-width: 768px) {
  .tabs {
    justify-content: space-evenly;
  }
  .tab-item {
    margin: auto 1em;
    text-align: center;
  }
  .tab-item p {
    font-size: 0.85em;
  }
}
</style>
