<template>
  <div>
    <div class="projects-list" v-if="displayProjects">
      <h1 class="title">Projects List</h1>
      <project-search
        @enteredInput="enteredInput"
        @selectedTerm="filterResults"
      ></project-search>
      <div class="loading" v-if="isLoading">
        <p>Loading Spinner</p>
      </div>
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
import { ref, computed } from "vue";
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

    useProjectsData().then((data) => {
      projects.value = data;
      isLoading.value = false;
    });

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
        filteredProject.value.length = 0;
      }
    }

    function deleteProject(data) {
      const toDelete = projects.value.filter(project => {
        return project.id === data;
      })
      const deleteIndex = projects.value.indexOf(toDelete[0]);
      projects.value.splice(deleteIndex, 1);
      console.log(projects.value);
      localStorage.removeItem("projects");

      axios.delete(`http://127.0.0.1:8000/api/projects/${data}`)
      .then(data => {
        console.log(data);
      })
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
      deleteProject
    };
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.no-projects p {
  font-weight: 300;
  font-size: 1em;
  padding: 1em 5em;
  background-color: var(--background-light);
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}

.error {
  background-color: #f8d7da !important;
}
</style>
