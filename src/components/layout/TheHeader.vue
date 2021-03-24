<template>
  <div class="nav-wrapper">
    <div class="main-nav">
      <a class="nav-brand" href="/">EmployeeDev</a>
      <ul class="nav-list">
        <li
          class="nav-item"
          :class="{ active: currentRoute === 'process-details' }"
        >
          Process Details
        </li>
        <li
          class="nav-item"
          :class="{ active: currentRoute === 'benefits-savings' }"
        >
          Benefits &amp; Savings
        </li>
        <li
          class="nav-item"
          :class="{ active: currentRoute === 'final-review' }"
        >
          Review
        </li>
      </ul>
      <ul class="nav-right">
        <li class="nav-item-right">
          <base-button secondaryVisible="true">
            <template v-slot:secondary>Logout</template>
          </base-button>
        </li>
      </ul>
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
      return route.name;
    });
    return {
      currentRoute,
    };
  },
};
</script>

<style scoped>
.nav-wrapper {
  background-color: var(--primary);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  max-width: 1260px;
}

.nav-brand {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5em;
  color: var(--secondary);
}

.nav-list,
.nav-right {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item,
.nav-item-right {
  margin: auto 1em;
  font-weight: 300;
  padding: 0.5em 0;
  margin: 0 2em 0 0;
  font-size: 1em;
}

.active {
  border-bottom: 2px solid #2a9d8f;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .nav-item {
    margin: auto 1em;
  }
  /* .nav-list {
    display: none;
  } */
}
</style>
