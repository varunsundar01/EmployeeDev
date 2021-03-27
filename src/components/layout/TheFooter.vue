<template>
  <div class="footer">
    <p>&copy; {{ currentYear }} | Built by <a href="#">Varun</a></p>
    <p>Github | Twitter | LinkedIn | Email</p>
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
  font-weight: 300;
  color: rgba(0, 0, 0, 0.5);
}
</style>
