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
        :title="project.projectName"
        author="Placeholder Author"
        :createdAt="project.createdAt"
        :slug="project.projectSlug"
      ></list-element>
      <list-element
        v-else-if="!displayFiltered"
        v-for="project in projects"
        :key="project.id"
        :title="project.projectName"
        author="Placeholder Author"
        :createdAt="project.createdAt"
        :slug="project.projectSlug"
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
import ListElement from "../../components/UI/ListElement.vue";
import ProjectSearch from "../../components/layout/ProjectSearch.vue";
import axios from "axios";
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

    if (!localStorage.getItem("projects")) {
      console.log("server");
      axios
        .get("http://127.0.0.1:8000/api/projects/")
        .then((response) => {
          console.log(response);
          const data = response.data;
          for (const value in data) {
            const year = new Date(
              Date.parse(data[value].created_at)
            ).getFullYear();
            const month = (
              "0" + new Date(Date.parse(data[value].created_at)).getMonth()
            ).slice(-2);
            const day = (
              "0" + new Date(Date.parse(data[value].created_at)).getDate()
            ).slice(-2);
            const createdDate = `${month}/${day}/${year}`;

            const ProjectObj = {
              id: data[value].id,
              projectName: data[value].project_name,
              projectSlug: `/${data[value].project_slug}`,
              problem: data[value].problem,
              solution: data[value].solution,
              implementation: data[value].implementation,
              implementationCost: data[value].implementation_cost,
              costSavings: data[value].cost_savings,
              timeToComplete: data[value].time_to_complete,
              createdAt: createdDate,
            };
            projects.value.push(ProjectObj);
          }
          localStorage.setItem("projects", JSON.stringify(projects));
          isLoading.value = false;
        })
        .catch(() => {
          error.value = "Failed to load data from database";
          isLoading.value = false;
        });
    } else {
      projects.value = JSON.parse(localStorage.getItem("projects"))._value;
      isLoading.value = false;
    }

    const displayProjects = computed(() => {
      if (isLoading.value === false && projects.value.length === 0) {
        return false;
      }
      return true;
    });

    function filterResults(data) {
      filteredProject.value = projects.value.filter((project) => {
        return project.projectName === data.value;
      });
    }

    function enteredInput(data) {
      if (data === "") {
        filteredProject.value.length = 0;
      }
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
