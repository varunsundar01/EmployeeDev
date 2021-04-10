<template>
  <div class="button-group">
    <button @click="toBack" v-if="secondaryVisible" class="secondary"><slot name="secondary"></slot></button>
    <button @click="toNext" v-if="primaryVisible"><slot name="primary"></slot></button>
  </div>
</template>

<script>
export default {
    props: ['primaryVisible', 'secondaryVisible'],
    emits: ['toNext', 'toBack'],
    setup(_,context) {
      function toNext() {
        context.emit('toNext');
      }
      function toBack() {
        context.emit('toBack');
      }

      return {
        toNext,
        toBack
      }
    }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-around;
}

button {
  border: none;
  padding: 0.5em 1em;
  font-size: 1.05em !important;
  background-color: var(--primary);
  border-radius: 3px;
  cursor: pointer;
  color: var(--background-light);
  font-weight: 400;
  transition: all 0.3s ease-in-out;
}

button:hover,
button:focus {
  background-color: var(--primary-variant);
  outline: none;
}

.secondary {
    background-color: var(--secondary);
}

.secondary:hover, .secondary:focus {
    background-color: var(--secondary-variant);
}
</style>
