<template>
  <div class="list-element">
    <h2 class="project-title">{{ title }}</h2>
    <p class="project-date">{{ createdAt }}</p>
    <p class="project-author">
      Submitted by: <span>{{ author }}</span>
    </p>

    <i
      class="icon-trash"
      @click="deleteProject"
      v-if="displayProjectOptions"
    ><small>Delete</small></i>

    <router-link :to="'/projects/' + slug"
      ><button class="project-button view">View</button></router-link
    >
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["id", "title", "author", "createdAt", "slug", "empId"],
  emits: ["deleteProject"],
  setup(props, context) {
    const store = useStore();

    function deleteProject() {
      context.emit("deleteProject", props.id);
    }

    let displayProjectOptions = computed(() => {
      if (store.getters["auth/getEmpId"] !== null) {
        if (
          store.getters["auth/isAuthenticated"] &&
          props.empId === store.getters["auth/getEmpId"]
        ) {
          return true;
        }
      }
      return false;
    });

    return {
      deleteProject,
      displayProjectOptions,
    };
  },
};
</script>

<style scoped>
.list-element {
  background-color: var(--background-light);
  padding: 1.85em 1.25em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 1em;
  position: relative;
}

i.icon-trash {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: var(--secondary);
  opacity: 0.6;
  border: 1px solid transparent;
  padding: 0.25em 0.5em;
  border-radius: 5px;
}

i.icon-trash:hover {
  background-color: var(--error-background);
  border: 1px solid var(--error-border);
  color: var(--error-button);
  opacity: 1;
}

i small {
  font-style: normal;
  margin-right: 0.2em;
}

.project-title {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.75em;
}

.project-date {
  font-weight: 300;
  margin: 0;
  opacity: 0.7;
}

.project-author {
  margin: 0.75em 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.1em;
}

.project-author span {
  font-weight: 300;
}

.view {
  background-color: var(--primary);
  color: var(--background-light);
}

.view a {
  color: var(--background-light);
  font-weight: 300;
}

.project-button.view:hover,
.project-button.view:focus {
  background-color: var(--primary-variant);
}

.delete {
  background-color: transparent;
  border-color: var(--error-button);
  color: var(--error-button);
}

.delete a {
  color: var(--error-button);
  font-weight: 300;
}

.delete:hover a {
  color: var(--background-light);
}

.project-button.delete:hover,
.project-button.delete:focus {
  background-color: #dc3545;
  border-color: #dc3545;
  color: var(--background-light);
}

.project-button.delete a:hover,
.project-button.delete a:focus {
  color: var(--background-light);
}

.project-button:hover,
.project-button:focus {
  outline: none;
}
</style>
