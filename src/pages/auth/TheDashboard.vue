<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <the-banner v-if="displayBanner">{{ bannerMessage }}</the-banner>

    <p class="dashboard-head">Hey, {{firstName}}. You can find all the projects you have submitted here.</p>
    <p class="dashboard-head">Click <router-link to="/projects">here</router-link> to view projects submitted by all employees</p>
    <the-spinner v-if="!$store.getters['projects/getUserProjects'].loaded"></the-spinner>
    <list-element v-else
      v-for="project in $store.getters['projects/getUserProjects'].projects"
      :key="project.id"
      :id="project.id"
      :title="project.project_name"
      :author="project.employee"
      :createdAt="project.createdAt"
      :slug="project.project_slug"
      :empId="parseInt(project.project_employee_id)"
      @deleteProject="deleteProjectDialog"
    ></list-element>
    <fleeting-message></fleeting-message>
    <delete-dialog
      :deleteProjectName="
        $store.getters['projects/getDeleteParams'].deleteProjectName
      "
      :deleteProjectId="
        $store.getters['projects/getDeleteParams'].deleteProjectId
      "
      @confirmDeleteProject="confirmDeleteProject"
      @toBack="toBack"
      v-if="dialogOpen"
    ></delete-dialog>
  </div>
</template>

<script>
import TheBanner from "../../components/UI/TheBanner.vue";
import ListElement from "../../components/UI/ListElement.vue";
import FleetingMessage from "../../components/UI/FleetingMessage.vue";
import DeleteDialog from "../../components/projects/DeleteDialog.vue";
import TheSpinner from "../../components/UI/TheSpinner.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TheBanner,
    ListElement,
    FleetingMessage,
    DeleteDialog,
    TheSpinner
  },

  setup() {
    const store = useStore();
    const submitMessage = ref("");
    let dialogOpen = ref(false);
    const firstName = ref(localStorage.getItem("firstName"));

    store.dispatch("projects/loadUserProjects");
    store.dispatch("projects/loadProjects");

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

    function toBack() {
      dialogOpen.value = false;
      store.dispatch("projects/resetDelete");
    }

    function deleteProjectDialog(projectId) {
      dialogOpen.value = true;
      store.dispatch("projects/preConfirmDelete", projectId);
    }

    function confirmDeleteProject(projectId) {
      dialogOpen.value = false;
      store.dispatch("projects/confirmDeleteProject", projectId);
    }

    return {
      displayBanner,
      submitMessage,
      bannerMessage,
      firstName,
      toBack,
      deleteProjectDialog,
      confirmDeleteProject,
      dialogOpen
    };
  },
};
</script>

<style scoped>
.dashboard-head {
  margin-bottom: 1em;
}
</style>
