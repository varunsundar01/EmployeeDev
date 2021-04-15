<template>
  <div>
    <div class="hero-section">
      <h1>Employee<span class="logo-second">Dev</span> Portal</h1>
      <p v-if="!$store.getters['auth/isAuthenticated']">
        Sign in to submit your proposed process improvement methods and
        strategies
      </p>
      <base-card v-if="!$store.getters['auth/isAuthenticated']">
        <the-auth></the-auth>
      </base-card>
      <p v-if="$store.getters['auth/isAuthenticated']">Welcome back, {{ firstName }}.</p>
      <p v-if="$store.getters['auth/isAuthenticated']">
        <router-link to="/process-details">Submit a project</router-link> or
        manage your projects in your
        <router-link to="/dashboard">dashboard</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import TheAuth from "../components/auth/TheAuth.vue";
import { ref } from "vue";
export default {
  components: {
    TheAuth,
  },
  setup() {
    const firstName = ref(localStorage.getItem("firstName"));

    return {
      firstName,
    };
  },
};
</script>

<style scoped>
.hero-section {
  margin-bottom: 2em;
  min-height: 70vh;
}
.hero-section h1 {
  font-size: 3em;
  font-weight: 500;
  margin: 0;
  color: var(--secondary);
}

.hero-section p {
  font-size: 1.25em;
  color: var(--secondary);
  margin: 0 auto 2em auto;
}

.logo-second {
  color: var(--active);
  font-weight: inherit;
}
</style>
