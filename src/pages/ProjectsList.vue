<template>
  <base-card>
    <h1>Projects List</h1>
    <ul>
      <li v-for="term in projects" :key="term">{{ term }}</li>
    </ul>
  </base-card>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const projects = reactive({
      id: null,
      projectName: "",
      problem: "",
      solution: "",
      implementation: "",
      implementationCost: null,
      costSavings: null,
      timeToComplete: null,
    });
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        projects.id = data[0].id;
        projects.projectName = data[0].project_name;
        projects.problem = data[0].problem;
        projects.solution = data[0].solution;
        projects.implementation = data[0].implementation;
        projects.implementationCost = data[0].implementation_cost;
        projects.costSavings = data[0].cost_savings;
        projects.timeToComplete = data[0].time_to_complete;
      });

    return {
      projects,
    };
  },
};
</script>
