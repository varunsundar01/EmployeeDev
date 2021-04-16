<template>
  <div class="footer">
    <p>&copy; {{ currentYear }} | Built by <a href="#">Varun</a></p>
    <div class="social-icons">
      <i class="icon-github-circled"></i>
      <i class="icon-twitter"></i>
      <i class="icon-linkedin"></i>
      <i class="icon-mail-alt"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const currentYear = ref(new Date().getFullYear());

    return {
      currentYear,
    };
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.1em;
}

.social-icons {
  margin: 0 auto 2em auto;
}

.social-icons i {
  color: var(--secondary);
  opacity: 0.5;
  margin: 0 1em;
  font-size: 1.75em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.social-icons i:hover {
  opacity: 1;
}
</style>
