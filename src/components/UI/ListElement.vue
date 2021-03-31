<template>
  <div class="list-element">
    <h2 class="project-title">{{ title }}</h2>
    <p class="project-author">
      Submitted by: <span>{{ author }}</span>
    </p>
    <p class="project-author">
      Submitted On: <span>{{ createdAt }}</span>
    </p>
    <button class="project-button view">
      <router-link :to="'/projects' + slug">View</router-link>
    </button>
    <button class="project-button delete">
      <router-link to="/">Delete</router-link>
    </button>
  </div>
</template>

<script>
export default {
  props: ["title", "author", "createdAt", "slug"],
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

.project-description {
  font-weight: 300;
  opacity: 0.8;
}

.project-button {
  border: none;
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 1em;
  font-weight: 300;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  margin-right: 1em;
  border: 1px solid transparent;
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
  border-color: #dc3545;
  color: #dc3545;
}

.delete a {
  color: #dc3545;
  font-weight: 300;
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
