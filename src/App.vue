<template>
  <div>
    <the-header></the-header>
    <div class="main-app">
      <router-view v-slot="{ Component }">
        <transition name="main" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.main-enter-from,
.main.leave-to {
  opacity: 0.7;
  transform: translateX(1%);
}

.main-enter-to,
.main-leave-from {
  opacity: 1;
  transform: translateX(0%);
}

.main-enter-active,
.main-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>
