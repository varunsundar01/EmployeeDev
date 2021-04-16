<template>
  <div>
    <div class="background" @click="toBack"></div>
    <dialog class="base-dialog" open>
      <h2 class="dialog-header">Delete?</h2>
      <div class="dialog-body">
        <p class="dialog-text">
          Are you sure you want to delete all the data associated with
          "{{ deleteProjectName }}"?
        </p>

        <div class="dialog-buttons">
          <button class="project-button delete" @click="confirmDeleteProject">Yes, Delete</button>
          <base-button @toBack="toBack" secondaryVisible="true">
            <template v-slot:secondary>No, Go Back</template>
          </base-button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  props: ["deleteProjectId", "deleteProjectName"],
  emits: ["toBack", "confirmDeleteProject"],
  setup(props, context) {
    function toBack() {
      context.emit("toBack");
    }

    function confirmDeleteProject() {
        context.emit("confirmDeleteProject", props.deleteProjectId);
    }

    return {
      toBack,
      confirmDeleteProject
    };
  },
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 15;
}

.base-dialog {
  background-color: var(--background-light);
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  overflow: hidden;
  border: 0;
  padding: 0;
  margin: 0;
}

.dialog-header {
  text-align: center;
  margin: 0;
  background-color: var(--error-background);
  padding: 0.75em 0;
  font-weight: 500;
  color: var(--secondary);
}

.dialog-body {
  padding: 1em 1em 1.5em 1em;
}

.dialog-text {
  margin: 0 auto 1.5em auto;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete {
  background-color: var(--error-button);
  color: var(--background-light);
}
</style>
