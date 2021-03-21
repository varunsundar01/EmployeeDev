<template>
  <div>
    <the-header></the-header>
    <div class="main-app">
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
