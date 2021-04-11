<template>
  <base-card>
    <the-banner v-if="$store.getters['auth/getSubmitMessage'] !== ''">{{ submitMessage }}</the-banner>
    <h1 class="title">Sign In</h1>
    <the-auth></the-auth>
  </base-card>
</template>

<script>
import TheAuth from "../../components/auth/TheAuth.vue";
import TheBanner from "../../components/UI/TheBanner.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: {
    TheAuth,
    TheBanner,
  },
  setup() {
    window.scrollTo(0, 0);

    const store = useStore();

    const submitMessage = ref(store.getters["auth/getSubmitMessage"]);

    return {
        submitMessage
    }
  },
};
</script>
