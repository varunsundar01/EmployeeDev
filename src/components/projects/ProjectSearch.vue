<template>
  <div>
    <div
      class="background"
      v-if="isFiltered && isOpen"
      @click="closeSearch"
    ></div>
    <div class="project-search">
      <input
        class="search-field"
        autocomplete="off"
        type="text"
        placeholder="Search Projects"
        v-model.trim="searchTerm"
        @input="enteredInput"
        @focus="startSearch"
      />

      <div class="search-suggestions" v-if="isFiltered && isOpen">
        <ul>
          <li
            v-for="project in $store.getters['projects/getAllProjectParams']
              .filteredProjectNames"
            :key="project"
            @click="selectProject"
          >
            {{ project }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  emits: ["selectedTerm", "enteredInput"],
  setup(_, context) {
    const store = useStore();

    let searchTerm = ref("");
    let displayProjects = ref([]);
    let isOpen = ref(false);

    onMounted(() => {
      store.dispatch("projects/loadProjects");
    });

    function enteredInput() {
      store.dispatch("projects/filterProjects", {
        type: "filter",
        value: searchTerm.value,
      });
    }

    function startSearch() {
      store.dispatch("projects/loadProjects");
      isOpen.value = true;
    }

    function closeSearch() {
      isOpen.value = false;
    }

    function selectProject(data) {
      searchTerm.value = data.target.innerHTML;
      isOpen.value = false;
      context.emit("selectedTerm", searchTerm.value);
    }

    const isFiltered = computed(() => {
      return (
        store.getters["projects/getAllProjectParams"].filteredProjects.length >
          0 && searchTerm.value !== ""
      );
    });

    return {
      searchTerm,
      enteredInput,
      displayProjects,
      isFiltered,
      selectProject,
      isOpen,
      closeSearch,
      startSearch,
    };
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.project-search {
  position: relative;
  width: 100%;
  margin-bottom: 2em;
  z-index: 3;
}

.search-field {
  width: 100%;
  z-index: 3;
}

.search-suggestions {
  margin: 0 0.25em 0 0.25em;
  background-color: var(--background-light);
  padding: 1em 0.5em;
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
  z-index: 3;
}

.search-suggestions ul {
  margin: 0;
  padding: 0;
}

.search-suggestions ul li {
  list-style-type: none;
  padding: 0.5em;
  cursor: pointer;
}

.search-suggestions ul li:hover {
  background-color: var(--background);
}
</style>
