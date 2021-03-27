<template>
  <div>
    <div class="hero-section">
      <h1>EmployeeDev Portal</h1>
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
}

.hero-section p {
  font-size: 1.25em;
  font-weight: 300;
}
</style>
