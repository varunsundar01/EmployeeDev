<template>
    <transition name="error">
      <div
        class="delete-message"
        v-if="$store.getters['projects/getDeleteParams'].showDeleteMessage"
      >
        <p>{{ $store.getters["projects/getDeleteParams"].deleteMessage }}</p>
      </div>
    </transition>
</template>

<style scoped>
.delete-message {
  background-color: var(--error-background);
  border: 1px solid var(--error-border);
  display: inline-block;
  padding: 0.5em 3.5em;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.delete-message p {
  color: var(--error-text);
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