<template>
  <div>
    <div class="hero-section">
      <h1>Employee<span class="logo-second">Dev</span> Portal</h1>
      <p>
        Sign in to submit your proposed process improvement methods and
        strategies
      </p>
      <the-auth></the-auth>
    </div>
    
  </div>
</template>

<script>
import TheAuth from '../components/auth/TheAuth.vue';
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
  color: var(--secondary);
  margin: 0 auto 2em auto;
}

.logo-second {
  color: var(--active);
}
</style>
