<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <the-banner v-if="displayBanner">{{
      $store.getters.checkSubmit.submitMessage
    }}</the-banner>

    <p>Projects list of current user</p>
  </div>
</template>

<script>
import TheBanner from "../../components/UI/TheBanner.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TheBanner,
  },

  setup() {
    const store = useStore();
    const submitMessage = ref("");

    const displayBanner = computed(() => {
      if (store.getters.checkSubmit.submitted) {
        return true;
      }
      return false;
    });

    return {
      displayBanner,
      submitMessage,
    };
  },
};
</script>
