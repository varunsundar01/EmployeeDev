<template>
  <transition name="error">
    <div v-if="showMessage" class="message" :class="className">
      <p>{{ $store.getters["projects/getDeleteParams"].deleteMessage }}</p>
      <p>{{ $store.getters["projects/checkSubmit"].submitMessage }}</p>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    let showMessage = computed(() => {
      return (
        store.getters["projects/getDeleteParams"].showDeleteMessage ||
        store.getters["projects/checkSubmit"].submitted
      );
    });

    let className = computed(() => {
      if (store.getters["projects/getDeleteParams"].showDeleteMessage) {
        return "delete";
      } else if (store.getters["projects/checkSubmit"].submitted) {
        return "success";
      } else {
        return "";
      }
    });

    return {
      className,
      showMessage,
    };
  },
};
</script>

<style scoped>
.message {
  display: inline-block;
  padding: 0.5em 3.5em;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
}

.delete {
  background-color: var(--error-background);
  border: 1px solid var(--error-border);
}

.success {
  background-color: var(--success-background);
  border: 1px solid var(--success-border);
}

.delete p {
  color: var(--error-text);
  margin: 0;
}

.success p {
  color: var(--success-text);
  margin: 0;
}

.error-enter-from,
.error-leave-to {
  bottom: -100px;
}

.error-enter-to,
.error-leave-from {
  bottom: 10px;
}

.error-enter-active {
  transition: all 0.3s ease-in-out;
}

.error-leave-active {
  transition: all 0.15s ease-in-out;
}
</style>
