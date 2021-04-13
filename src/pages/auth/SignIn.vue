<template>
  <base-card>
    <h1 class="title">Sign In</h1>
    <the-auth></the-auth>
  </base-card>
</template>

<script>
import TheAuth from "../../components/auth/TheAuth.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: {
    TheAuth
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
