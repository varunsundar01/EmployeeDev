<template>
  <div class="banner" :class="bannerType">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
export default {
  setup() {
    const store = useStore();

    const bannerType = computed(() => {
      if (store.getters.checkError) {
        return 'error';
      }
      return 'success';
    })

    return {
      bannerType
    }
  }
}
</script>

<style scoped>
.banner {
  padding: 0.75em 1.25em;
  background-color: var(--background-light);
  margin-bottom: 1.5em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
}

.error {
  background-color: var(--error-background);
  border-color: var(--error-border);
  color: var(--error-text);
}

.success {
  background-color: var(--success-background);
  border-color: var(--success-border);
  color: var(--success-text);
}

p {
  padding: 0;
  margin: 0;
  font-size: 1em;
}
</style>
