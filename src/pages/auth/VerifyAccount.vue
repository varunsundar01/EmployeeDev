<template>
  <base-card>
    <h1 class="title">Verify Your Account</h1>
    <the-banner></the-banner>
  </base-card>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import TheBanner from "../../components/UI/TheBanner.vue";
export default {
  components: {
    TheBanner
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    if (!route.query.req_u && !route.query.reset) {
      router.push("/sign-in");
    }

    store.dispatch('auth/verifyUser', {
      uidb64: route.query.req_u,
      token: route.query.reset
    });
  }
};
</script>
