<template>
  <div class="list-element">
    <h2 class="project-title">{{ title }}</h2>
    <p class="project-author">
      Submitted by: <span>{{ author }}</span>
    </p>
    <p class="project-author">
      Submitted On: <span>{{ createdAt }}</span>
    </p>

    <router-link :to="'/projects/' + slug"
      ><button class="project-button view">View</button></router-link
    >
    <button class="project-button delete" @click="deleteProject" v-if="$store.getters['auth/isAuthenticated']">Delete</button>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "author", "createdAt", "slug"],
  emits: ["deleteProject"],
  setup(props, context) {

    function deleteProject() {
      context.emit("deleteProject", props.id);
    }

    return {
      deleteProject
    };
  },
};
</script>

<style scoped>
.list-element {
  background-color: var(--background-light);
  padding: 0.55em 1.25em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 1em;
}

.project-title {
  margin: 0;
  padding: 0;
  font-weight: 500;
  margin-bottom: 0.25em;
}

.project-author {
  margin: 0;
  padding: 0;
  font-weight: 500;
  margin-bottom: 1em;
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
