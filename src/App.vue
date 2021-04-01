<template>
  <div>
    <the-header></the-header>
    <div class="main-app">
      <the-tab
        v-if="
          currentRoute === '/process-details' ||
            currentRoute === '/benefits-savings' ||
            currentRoute === '/final-review'
        "
      ></the-tab>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
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
