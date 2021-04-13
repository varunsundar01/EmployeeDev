<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <the-banner v-if="displayBanner">{{ bannerMessage }}</the-banner>
    <the-banner v-if="errorBanner">{{ errorMessage }}</the-banner>
    
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
      if (store.getters['projects/checkSubmit'].submitted || store.getters['auth/getSubmitMessage'] !== "") {
        return true;
      }
      return false;
    });

    const bannerMessage = computed(() => {
      if (store.getters['projects/checkSubmit'].submitMessage !== "") {
        return store.getters['projects/checkSubmit'].submitMessage;
      } else if (store.getters['auth/getSubmitMessage'] !== "") {
        return store.getters['auth/getSubmitMessage'];
      } else {
        return "";
      }
    })

    const errorBanner = computed(() => {
      if (store.getters['auth/getError'].authError) {
        return true;
      }
      return false;
    });

    const errorMessage = computed(() => {
      if (store.getters['auth/getError'].authError) {
        return store.getters['auth/getError'].errorMessage;
      } 
      return "";
    })

    return {
      displayBanner,
      submitMessage,
      bannerMessage,
      errorBanner,
      errorMessage
    };
  },
};
</script>
