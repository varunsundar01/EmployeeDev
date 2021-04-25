<template>
  <div class="notfound">
    <base-card>
      <p class="notfound-text">The page your are looking for does not exist</p>

      <p>
        Take me back to my <router-link to="/dashboard">dashboard</router-link>
      </p>
    </base-card>
  </div>
</template>

<style scoped>
.notfound {
  height: 70vh;
}
.notfound-text {
  font-size: 1.5em;
}
</style>
