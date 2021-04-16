<template>
  <div>
    <delete-message></delete-message>
    <the-spinner
      v-if="!$store.getters['projects/getAllProjectParams'].loaded"
    ></the-spinner>
    <div class="projects-list" v-if="projectsExist">
      <h1 class="title">Projects List</h1>
      <project-search
        v-if="$store.getters['projects/getAllProjectParams'].loaded"
        @selectedTerm="selectProject"
      ></project-search>
      <list-element
        v-for="project in $store.getters['projects/getAllProjectParams']
          .filteredProjects"
        :key="project.id"
        :id="project.id"
        :title="project.project_name"
        :author="project.employee"
        :createdAt="project.createdAt"
        :slug="project.project_slug"
        @deleteProject="deleteProjectDialog"
      ></list-element>
    </div>
    <div class="no-projects" v-else>
      <p>No Projects Found</p>
    </div>
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ListElement from "../../components/UI/ListElement.vue";
import ProjectSearch from "../../components/projects/ProjectSearch.vue";
import DeleteMessage from "../../components/UI/DeleteMessage.vue";
import DeleteDialog from "../../components/projects/DeleteDialog.vue";
export default {
  components: {
    ListElement,
    ProjectSearch,
    DeleteMessage,
    DeleteDialog
  },
  setup() {
    const store = useStore();
    let dialogOpen = ref(false);

    onMounted(() => {
      store.dispatch("projects/loadProjects");
    });

    const projectsExist = computed(() => {
      if (
        store.getters["projects/getAllProjectParams"].loaded &&
        store.getters["projects/getAllProjectParams"].allProjects.length > 0
      ) {
        return true;
      }
      return false;
    });

    function selectProject(projectData) {
      store.dispatch("projects/filterProjects", {
        type: "select",
        value: projectData,
      });
    }

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
      selectProject,
      projectsExist,
      deleteProjectDialog,
      dialogOpen,
      toBack,
      confirmDeleteProject,
    };
  },
};
</script>

<style scoped>
.no-projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.no-projects p {
  font-size: 1em;
  padding: 1em 5em;
  background-color: var(--background-light);
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}

.error {
  background-color: var(--error-background) !important;
}
</style>
