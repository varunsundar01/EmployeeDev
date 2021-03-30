<template>
  <div>
    <the-header></the-header>
    <div class="main-app">
      <the-tab v-if="currentRoute === '/process-details' || currentRoute === '/benefits-savings' || currentRoute === '/final-review'"></the-tab>
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
import TheTab from "./components/layout/TheTab.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  components: {
    TheTab,
  },
  name: "App",
  setup() {
    const route = useRoute();
    let currentRoute = computed(() => {
      return route.path;
    });
    return {
      currentRoute,
    };
  },
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
