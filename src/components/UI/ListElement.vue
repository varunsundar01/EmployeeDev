<template>
  <div class="list-element">
    <h2 class="project-title">{{ title }}</h2>
    <p class="project-author">
      Submitted by: <span>{{ author }}</span>
    </p>
    <p class="project-author">
      Submitted On: <span>{{ createdAt }}</span>
    </p>
    <button class="project-button"><router-link :to="slug">View</router-link></button>
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
  background-color: var(--primary);
  color: var(--background-light);
  font-weight: 300;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}

.project-button a {
    color: var(--background-light);
    font-weight: 300;
}

.project-button:hover,
.project-button:focus {
  background-color: var(--primary-variant);
  outline: none;
}
</style>
