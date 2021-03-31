<template>
  <div class="project-detail">
    <h1 class="project-name">{{ project.projectName }}</h1>

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
        <p>${{ project.implementationCost }}</p>
      </div>
      <div class="numbers-item">
        <h2 class="numbers-title">Annual Cost Savings</h2>
        <p>${{ project.costSavings }}</p>
      </div>
    </div>

    <div class="project-item">
      <p class="meta-title">
        Estimated Weeks to Completion:
        <span class="meta-info">{{ project.timeToComplete }}</span>
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
</template>

<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    //GET DATA FROM DATABASE IF DOES NOT EXIST IN LOCALSTORAGE. ADD MIXIN
    const projectsObj = JSON.parse(localStorage.getItem("projects"))._value;

    const project = projectsObj.filter((project) => {
      return project.projectSlug === `/${route.params.slug}`;
    });

    return {
      project: project[0],
    };
  },
};
</script>

<style scoped>
.project-detail {
  width: 90%;
  max-width: 800px;
  margin: auto;
  font-weight: 300;
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
  font-weight: 300;
}

.author {
  background-color: var(--primary);
  color: var(--background-light);
  padding: 0.25em 1em;
  font-weight: 300;
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
