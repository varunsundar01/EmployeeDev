<template>
  <base-card>
    <the-banner v-if="showBanner">{{ bannerMessage }}</the-banner>
    <h1 class="title">Sign In</h1>
    <the-auth></the-auth>
  </base-card>
</template>

<script>
import TheAuth from "../../components/auth/TheAuth.vue";
import TheBanner from "../../components/UI/TheBanner.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  components: {
    TheAuth,
    TheBanner,
  },
  setup() {
    window.scrollTo(0, 0);

    const store = useStore();

    const submitMessage = ref(store.getters["auth/getSubmitMessage"]);

    let showBanner = computed(() => {
      if (store.getters['auth/getSubmitMessage'] !== '' || store.getters['auth/getError'].authError) {
        return true;
      }
      return false;
    })

    let bannerMessage = computed(() => {
      if (store.getters['auth/getSubmitMessage'] !== '') {
        return store.getters['auth/getSubmitMessage'];
      } else if (store.getters['auth/getError'].authError) {
        return store.getters['auth/getError'].errorMessage;
      } else {
        return "";
      }
    })

    return {
        submitMessage,
        showBanner,
        bannerMessage
    }
  },
};
</script>
