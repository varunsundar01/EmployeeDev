<template>
  <div>
    <the-header></the-header>
    <div class="main-app">
      <the-tab v-if="tabCheck"></the-tab>
      <router-view v-slot="{ Component }">
        <keep-alive v-if="!$store.getters.checkSubmit.submitted && $route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
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

    let tabCheck = computed(() => {
      return (
        route.path === "/process-details" ||
        route.path === "/benefits-savings" ||
        route.path === "/final-review"
      );
    });

    return {
      tabCheck,
    };
  },
};
</script>
