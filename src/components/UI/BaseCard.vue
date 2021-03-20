<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 5px;
  padding: 1em;
  max-width: 760px;
  margin: 0 auto 2em auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
</style>
