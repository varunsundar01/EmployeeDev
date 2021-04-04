<template>
  <div>
    <div v-if="isLoading" class="loading">
      <p>Loading Spinner</p>
    </div>
    <div v-else class="project-detail">
      <h1 class="project-name">{{ project.project_name }}</h1>

      <div class="project-meta">
        <p class="meta-title author">
          Submitted by: <span class="meta-info">Placeholder</span>
          <!--- link to author page with projects by author --->
        </p>
        <p class="meta-title">
          Submitted: <span class="meta-info">{{ project.createdAt }}</span>
        </p>
      </div>

      <div class="project-numbers">
        <div class="numbers-item">
          <h2 class="numbers-title">Implementation Cost</h2>
          <p>${{ project.implementation_cost }}</p>
        </div>
        <div class="numbers-item">
          <h2 class="numbers-title">Annual Cost Savings</h2>
          <p>${{ project.cost_savings }}</p>
        </div>
      </div>

      <div class="project-item">
        <p class="meta-title">
          Estimated Weeks to Completion:
          <span class="meta-info">{{ project.time_to_complete }}</span>
        </p>
      </div>

      <div class="project-item">
        <h2 class="item-title">Problem Statement</h2>
        <p>{{ project.problem }}</p>
      </div>
      <div class="project-item">
        <h2 class="item-title">Proposed Solution</h2>
        <p>{{ project.solution }}</p>
      </div>
      <div class="project-item">
        <h2 class="item-title">Implementation Method</h2>
        <p>{{ project.implementation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import useProjectsData from "../../hooks/useProjectsData";
export default {
  setup() {
    window.scrollTo(0, 0);
    const route = useRoute();
    const projectsObj = ref([]);
    const project = ref([]);
    let isLoading = ref(true);

    useProjectsData().then((data) => {
      projectsObj.value = data;
      project.value = projectsObj.value.filter((project) => {
        return project.project_slug === route.params.slug;
      })[0];
      isLoading.value = false;
    });

    return {
      project,
      isLoading,
    };
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.project-detail {
  width: 90%;
  max-width: 800px;
  margin: auto;
}

.project-item {
  background-color: var(--background-light);
  padding: 1.5em 1em;
  margin: 0 auto 1em auto;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
}

p {
  font-size: 1.1em;
  padding: 0;
  margin: 0;
}

.project-name {
  font-weight: 500;
  text-align: center;
  font-size: 2.25em;
  margin: 0 auto 0.25em auto;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25em;
}

.meta-title {
  font-weight: 500;
}

.meta-info {
  font-weight: 400;
}

.author {
  background-color: var(--primary);
  color: var(--background-light);
  padding: 0.25em 1em;
  font-weight: 500;
  border-radius: 50px;
}

.project-numbers {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1.5em;
}

.numbers-item {
  background-color: var(--background-light);
  padding: 1em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
}

.numbers-title {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0 auto 0.5em auto;
  text-align: center;
}

.numbers-item p {
  font-size: 1.35em;
  text-align: center;
}

.item-title {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0 auto 0.5em auto;
}
</style>
