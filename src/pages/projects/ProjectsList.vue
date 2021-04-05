<template>
  <div>
    <transition name="error">
      <div class="delete-message" v-if="isDeleted">
        <p>{{ deletedMessage }}</p>
      </div>
    </transition>
    <div class="projects-list" v-if="displayProjects">
      <h1 class="title">Projects List</h1>
      <project-search
        v-if="!isLoading"
        @enteredInput="enteredInput"
        @selectedTerm="filterResults"
        :clearData="clearData"
      ></project-search>
      <the-spinner v-if="isLoading"></the-spinner>
      <list-element
        v-else-if="displayFiltered"
        v-for="project in filteredProject"
        :key="project.id"
        :id="project.id"
        :title="project.project_name"
        author="Placeholder Author"
        :createdAt="project.createdAt"
        :slug="project.project_slug"
        @deleteProject="deleteProject"
      ></list-element>
      <list-element
        v-else-if="!displayFiltered"
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :title="project.project_name"
        author="Placeholder Author"
        :createdAt="project.createdAt"
        :slug="project.project_slug"
        @deleteProject="deleteProject"
      ></list-element>
    </div>
    <div class="no-projects" v-else>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-else>No Projects Found</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import ListElement from "../../components/UI/ListElement.vue";
import ProjectSearch from "../../components/layout/ProjectSearch.vue";
import useProjectsData from "../../hooks/useProjectsData.js";
export default {
  components: {
    ListElement,
    ProjectSearch,
  },
  setup() {
    let projects = ref([]);
    let isLoading = ref(true);
    let filteredProject = ref([]);
    const error = ref("");
    let isDeleted = ref(false);
    let deletedMessage = ref("");
    let clearData = ref(false);

    onMounted(() => {
      loadProjects();
    })

    function loadProjects() {
      isLoading.value = true;
      useProjectsData().then((data) => {
        projects.value = data;
        isLoading.value = false;
      });
    }

    const displayProjects = computed(() => {
      if (isLoading.value === false && projects.value.length === 0) {
        return false;
      }
      return true;
    });

    function filterResults(data) {
      filteredProject.value = projects.value.filter((project) => {
        return project.project_name === data.value;
      });
    }

    function enteredInput(data) {
      if (data === "") {
        clearData.value = false;
        filteredProject.value.length = 0;
      }
    }

    function deleteProject(data) {
      const toDelete = projects.value.filter((project) => {
        return project.id === data;
      });
      const deleteIndex = projects.value.indexOf(toDelete[0]);
      projects.value.splice(deleteIndex, 1);
      localStorage.removeItem("projects");

      axios
        .delete(`http://127.0.0.1:8000/api/projects/${data}`)
        .then((data) => {
          if (data.status === 204) {
            deletedMessage.value = "Project was deleted";
          } else {
            deletedMessage.value = "There was a problem deleting the project";
          }
          clearData.value = true;
          isDeleted.value = true;

          setTimeout(() => {
            isDeleted.value = false;
          }, 1500);
        });
    }

    const displayFiltered = computed(() => {
      return !isLoading.value && filteredProject.value.length > 0;
    });

    return {
      projects,
      filterResults,
      isLoading,
      filteredProject,
      displayFiltered,
      enteredInput,
      displayProjects,
      error,
      deleteProject,
      isDeleted,
      deletedMessage,
      clearData,
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

.delete-message {
  background-color: var(--error-background);
  border: 1px solid var(--error-border);
  display: inline-block;
  padding: 0.5em 3.5em;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.delete-message p {
  color: var(--error-text);
  margin: 0;
}

.error-enter-from,
.error-leave-to {
  bottom: -100px;
}

.error-enter-to,
.error-leave-from {
  bottom: 10px;
}

.error-enter-active {
  transition: all 0.3s ease-in-out;
}

.error-leave-active {
  transition: all 0.15s ease-in-out;
}
</style>
