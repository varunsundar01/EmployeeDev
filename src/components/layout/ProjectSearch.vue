<template>
  <div class="project-search">
    <input
      class="search-field"
      autocomplete="off"
      type="text"
      placeholder="Search Projects"
      v-model.trim="searchTerm"
      @input="enteredInput"
      @focus="isOpen = true"
    />

    <div class="search-suggestions" v-if="isFiltered && isOpen">
      <ul>
        <li
          v-for="project in filteredProjects"
          :key="project"
          @click="selectProject"
        >
          {{ project }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  emits: ["selectedTerm", "enteredInput"],
  setup(_, context) {
    const searchTerm = ref("");
    const projectNames = ref([]);
    let filteredProjects = ref([]);
    const projects = JSON.parse(localStorage.getItem("projects"))._value;
    let isOpen = ref(false);

    for (let project in projects) {
      projectNames.value.push(projects[project].projectName);
    }

    function enteredInput() {
      context.emit('enteredInput', searchTerm.value);
      filteredProjects.value = projectNames.value.filter((project) => {
        return project.toLowerCase().includes(searchTerm.value.toLowerCase());
      });
    }

    function selectProject(data) {
      searchTerm.value = data.target.innerHTML;
      isOpen.value = false;
      context.emit("selectedTerm", searchTerm);
    }

    const isFiltered = computed(() => {
      if (filteredProjects.value.length > 0 && searchTerm.value.trim() !== "") {
        return true;
      }
      return false;
    });

    return {
      searchTerm,
      enteredInput,
      projectNames,
      filteredProjects,
      isFiltered,
      selectProject,
      isOpen,
    };
  },
};
</script>

<style scoped>
.project-search {
  width: 100%;
  margin-bottom: 2em;
  z-index: 2;
}

.search-field {
  width: 100%;
}

.search-suggestions {
  margin: 0 0.25em 0 0.25em;
  background-color: var(--background-light);
  padding: 1em 0.5em;
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
}

.search-suggestions ul {
  margin: 0;
  padding: 0;
}

.search-suggestions ul li {
  list-style-type: none;
  font-weight: 300;
  padding: 0.5em;
  cursor: pointer;
}

.search-suggestions ul li:hover {
  background-color: var(--background);
}
</style>
