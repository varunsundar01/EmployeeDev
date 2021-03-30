<template>
  <div>
    <h1>Projects List</h1>
    <list-element
      v-for="project in projects"
      :key="project.id"
      :title="project.projectName"
      author="Placeholder Author"
      :createdAt="project.createdAt"
      :slug="project.projectSlug"
    ></list-element>
  </div>
</template>

<script>
// import { reactive } from "vue";
import { ref } from "vue";
import ListElement from "../components/UI/ListElement.vue";
export default {
  components: {
    ListElement,
  },
  setup() {
    const projects = ref([]);
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (const value in data) {
          const year = new Date(Date.parse(data[value].created_at)).getFullYear();
          const month = ('0' + new Date(Date.parse(data[value].created_at)).getMonth()).slice(-2);
          const day = ('0' + new Date(Date.parse(data[value].created_at)).getDate()).slice(-2);
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
            createdAt: createdDate
          }
          projects.value.push(ProjectObj);
        }
      });

    return {
      projects,
    };
  },
};
</script>
