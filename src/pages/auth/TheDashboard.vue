<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <the-banner v-if="displayBanner">{{ bannerMessage }}</the-banner>

    <p class="dashboard-head">Hey, {{firstName}}. You can find all the projects you have submitted here.</p>
    <p class="dashboard-head">Click <router-link to="/projects">here</router-link> to view projects submitted by your colleagues</p>
    <list-element
      v-for="project in $store.getters['projects/getUserProjects']"
      :key="project.id"
      :id="project.id"
      :title="project.project_name"
      author="Placeholder Author"
      :createdAt="project.createdAt"
      :slug="project.project_slug"
      @deleteProject="deleteProjectDialog"
    ></list-element>
  </div>
</template>

<script>
import TheBanner from "../../components/UI/TheBanner.vue";
import ListElement from "../../components/UI/ListElement.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TheBanner,
    ListElement,
  },

  setup() {
    const store = useStore();
    const submitMessage = ref("");
    const firstName = ref(localStorage.getItem("firstName"));

    store.dispatch("projects/loadUserProjects");

    const displayBanner = computed(() => {
      if (
        store.getters["projects/checkSubmit"].submitted ||
        store.getters["auth/getSubmitMessage"] !== ""
      ) {
        return true;
      }
      return false;
    });

    const bannerMessage = computed(() => {
      if (store.getters["projects/checkSubmit"].submitMessage !== "") {
        return store.getters["projects/checkSubmit"].submitMessage;
      } else if (store.getters["auth/getSubmitMessage"] !== "") {
        return store.getters["auth/getSubmitMessage"];
      } else if (store.getters["projects/checkError"].errorActive) {
        return store.getters["projects/checkError"].errorMessage;
      } else {
        return "";
      }
    });

    // const errorBanner = computed(() => {
    //   if (store.getters['auth/getError'].authError || store.getters['projects/checkError']) {
    //     return true;
    //   }
    //   return false;
    // });

    // const errorMessage = computed(() => {
    //   if (store.getters['auth/getError'].authError) {
    //     return store.getters['auth/getError'].errorMessage;
    //   }
    //   return "";
    // })

    return {
      displayBanner,
      submitMessage,
      bannerMessage,
      firstName
      // errorBanner,
      // errorMessage
    };
  },
};
</script>

<style scoped>
.dashboard-head {
  margin-bottom: 1em;
}
</style>
