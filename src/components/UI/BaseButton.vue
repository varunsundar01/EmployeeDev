<template>
  <div class="button-group">
    <button v-if="secondaryVisible" class="secondary"><slot name="secondary"></slot></button>
    <button v-if="primaryVisible"><slot name="primary"></slot></button>
  </div>
</template>

<script>
export default {
    props: ['primaryVisible', 'secondaryVisible']
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
  font-size: 1em;
  background-color: #6f59df;
  border-radius: 3px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 300;
  transition: all 0.3s ease-in-out;
}

button:hover,
button:focus {
  background-color: #5c43db;
  outline: none;
  transform: translateY(-10%);
}

.secondary {
    background-color: #221D2B;
}

.secondary:hover, .secondary:focus {
    background-color: #0A080C;
}
</style>
