<template>
  <div>
    <the-spinner
      v-if="!$store.getters['projects/getAllProjectParams'].loaded"
    ></the-spinner>
    <div v-else class="project-detail">
      <h1 class="project-name">
        {{ $store.getters["projects/getProjectDetail"].projectName }}
      </h1>

      <div class="project-meta">
        <p class="meta-title author">
          Submitted by:
          <span class="meta-info">{{
            $store.getters["projects/getProjectDetail"].employee
          }}</span>
          <!--- link to author page with projects by author --->
        </p>
        <p class="meta-title">
          Submitted:
          <span class="meta-info">{{
            $store.getters["projects/getProjectDetail"].createdAt
          }}</span>
        </p>
      </div>

      <div class="project-numbers">
        <div class="numbers-item">
          <h2 class="numbers-title">Implementation Cost</h2>
          <p>
            ${{
              $store.getters["projects/getProjectDetail"].implementationCost
            }}
          </p>
          <i
            class="icon-pencil"
            @click="
              editValue(
                'Implementation Cost',
                'implementationCost',
                `$${$store.getters['projects/getProjectDetail'].implementationCost}`,
                'currency'
              )
            "
          ></i>
        </div>
        <div class="numbers-item">
          <h2 class="numbers-title">Annual Cost Savings</h2>
          <p>${{ $store.getters["projects/getProjectDetail"].costSavings }}</p>
          <i class="icon-pencil"></i>
        </div>
      </div>

      <div class="project-item">
        <p class="meta-title">
          Estimated Weeks to Completion:
          <span class="meta-info">{{
            $store.getters["projects/getProjectDetail"].timeToComplete
          }}</span>
        </p>
        <i class="icon-pencil"></i>
      </div>

      <div class="project-item">
        <h2 class="item-title">Problem Statement</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].problem }}</p>
        <i class="icon-pencil"></i>
      </div>
      <div class="project-item">
        <h2 class="item-title">Proposed Solution</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].solution }}</p>
        <i class="icon-pencil"></i>
      </div>
      <div class="project-item">
        <h2 class="item-title">Implementation Method</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].implementation }}</p>
        <i class="icon-pencil"></i>
      </div>
    </div>

    <edit-dialog
      @toBack="toBack"
      :editId="editId"
      :editName="editName"
      :editFieldType="editFieldType"
      :currentValue="currentValue"
      v-if="showEditDialog"
    ></edit-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import EditDialog from "../../components/projects/EditDialog.vue";
export default {
  components: {
    EditDialog,
  },
  setup() {
    window.scrollTo(0, 0);
    const store = useStore();
    const route = useRoute();

    let showEditDialog = ref(false);
    let editId = ref("");
    let editName = ref("");
    let editFieldType = ref("input");
    let currentValue = ref("");

    function editValue(fieldName, fieldId, fieldCurrentValue, fieldType) {
      showEditDialog.value = true;
      editName.value = fieldName;
      editId.value = fieldId;
      currentValue.value = fieldCurrentValue;
      editFieldType.value = fieldType;
    }

    function toBack() {
      showEditDialog.value = false;
    }

    onMounted(() => {
      store.dispatch("projects/loadProjects");
      store.dispatch("projects/loadProjectDetail", route.params.slug);
    });

    return {
      showEditDialog,
      editValue,
      editName,
      editId,
      editFieldType,
      currentValue,
      toBack,
    };
  },
};
</script>

<style scoped>
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
  position: relative;
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
  position: relative;
}

i.icon-pencil {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.2;
  color: var(--secondary);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

i.icon-pencil:hover {
  opacity: 1;
}

.numbers-title {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0 auto 0.5em auto;
  text-align: center;
}

.numbers-item p {
  font-size: 1.45em;
  text-align: center;
}

.item-title {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0 auto 0.5em auto;
}
</style>
