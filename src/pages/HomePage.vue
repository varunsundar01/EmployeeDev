<template>
  <div>
    <div class="hero-section">
      <h1><span class="logo-first">Employee</span><span class="logo-second">Dev</span> Portal</h1>
      <p>
        Sign in to submit your proposed process improvement methods and
        strategies
      </p>
      <the-auth></the-auth>
    </div>
    
  </div>
</template>

<script>
import TheAuth from '../components/layout/TheAuth.vue';
export default {
  components: {
    TheAuth
  }
}
</script>

<style scoped>
.hero-section {
  margin-bottom: 2em;
}
.hero-section h1 {
  font-size: 3em;
  font-weight: 500;
  margin: 0;
  color: var(--secondary);
}

.hero-section p {
  font-size: 1.25em;
  font-weight: 300;
  color: var(--secondary);
  margin: 0 auto 2em auto;
}

.logo-first {
  font-weight: 300;
}

.logo-second {
  color: var(--active);
}
</style>
