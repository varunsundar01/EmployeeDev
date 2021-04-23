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
            v-if="displayProjectOptions"
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
          <i
            v-if="displayProjectOptions"
            class="icon-pencil"
            @click="
              editValue(
                'Annual Cost Savings',
                'costSavings',
                `$${$store.getters['projects/getProjectDetail'].costSavings}`,
                'currency'
              )
            "
          ></i>
        </div>
      </div>

      <div class="project-item">
        <p class="meta-title">
          Estimated Weeks to Completion:
          <span class="meta-info">{{
            $store.getters["projects/getProjectDetail"].timeToComplete
          }}</span>
        </p>
        <i
          v-if="displayProjectOptions"
          class="icon-pencil"
          @click="
            editValue(
              'Estimated Weeks to Completion',
              'timeToComplete',
              `${$store.getters['projects/getProjectDetail'].timeToComplete}`,
              'input',
              'number'
            )
          "
        ></i>
      </div>

      <div class="project-item">
        <h2 class="item-title">Problem Statement</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].problem }}</p>
        <i
          v-if="displayProjectOptions"
          class="icon-pencil"
          @click="
            editValue(
              'Problem Statement',
              'problem',
              `${$store.getters['projects/getProjectDetail'].problem}`,
              'textarea'
            )
          "
        ></i>
      </div>
      <div class="project-item">
        <h2 class="item-title">Proposed Solution</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].solution }}</p>
        <i
          v-if="displayProjectOptions"
          class="icon-pencil"
          @click="
            editValue(
              'Proposed Solution',
              'solution',
              `${$store.getters['projects/getProjectDetail'].solution}`,
              'textarea'
            )
          "
        ></i>
      </div>
      <div class="project-item">
        <h2 class="item-title">Implementation Method</h2>
        <p>{{ $store.getters["projects/getProjectDetail"].implementation }}</p>
        <i
          v-if="displayProjectOptions"
          class="icon-pencil"
          @click="
            editValue(
              'Implementation Method',
              'implementation',
              `${$store.getters['projects/getProjectDetail'].implementation}`,
              'textarea'
            )
          "
        ></i>
      </div>
    </div>

    <edit-dialog
      @toBack="toBack"
      @toNext="confirmUpdate"
      @enteredInput="enteredInput"
      :editId="editId"
      :editName="editName"
      :editFieldType="editFieldType"
      :editFieldStyle="editFieldStyle"
      :currentValue="currentValue"
      :isError="isError"
      :fieldError="fieldError"
      v-if="showEditDialog"
    ></edit-dialog>
    <fleeting-message></fleeting-message>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import EditDialog from "../../components/projects/EditDialog.vue";
import FleetingMessage from "../../components/UI/FleetingMessage.vue";
export default {
  components: {
    EditDialog,
    FleetingMessage,
  },
  setup() {
    window.scrollTo(0, 0);
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("projects/loadProjects");
      loadProjects();
    });

    let showEditDialog = ref(false);
    let editId = ref("");
    let editName = ref("");
    let editFieldStyle = ref("input");
    let editFieldType = ref("text");
    let currentValue = ref("");
    let newValue = ref("");
    let isError = ref(false);
    let fieldError = ref("");

    watch(
      () => store.getters["projects/getAllProjectParams"].loaded,
      () => {
        loadProjects();
      }
    );

    let displayProjectOptions = computed(() => {
      if (
        store.getters["auth/isAuthenticated"] &&
        store.getters["projects/getProjectDetail"].projectEmployeeId ===
          store.getters["auth/getEmpId"]
      ) {
        return true;
      }
      return false;
    });

    function loadProjects() {
      if (store.getters["projects/getAllProjectParams"].loaded) {
        store.dispatch("projects/loadProjectDetail", route.params.slug);
      }
    }

    function editValue(
      fieldName,
      fieldId,
      fieldCurrentValue,
      fieldStyle,
      fieldType
    ) {
      //Reset error messages before update
      fieldError.value = "";
      isError.value = false;
      
      showEditDialog.value = true;
      editName.value = fieldName;
      editId.value = fieldId;
      currentValue.value = fieldCurrentValue;
      editFieldStyle.value = fieldStyle;
      editFieldType.value = fieldType;
    }

    function confirmUpdate() {
      if (newValue.value.trim() !== "") {
        fieldError.value = "";
        store.dispatch("projects/confirmUpdate", {
          id: editId.value,
          value: newValue.value,
        });
        showEditDialog.value = false;
      }
      isError.value = true;
      fieldError.value = "Enter some text to update";
    }

    function toBack() {
      fieldError.value = "";
      isError.value = false;
      showEditDialog.value = false;
      newValue.value = "";
    }

    function enteredInput(data) {
      newValue.value = data.value;
    }

    return {
      showEditDialog,
      editValue,
      editName,
      editId,
      editFieldType,
      editFieldStyle,
      currentValue,
      toBack,
      confirmUpdate,
      enteredInput,
      displayProjectOptions,
      fieldError,
      isError
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
  padding: 1.85em 1em 1em 1em;
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

@media(max-width: 768px) {
  .project-meta {
    flex-direction: column;
  }
  .project-numbers {
    grid-template-columns: 1fr;
  }
}
</style>
