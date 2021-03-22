<template>
  <div class="error-banner">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style scoped>
.error-banner {
  padding: 0.5em;
  background-color: #f8d7da;
  margin-bottom: 1em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

p {
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 0.85em;
}
</style>
