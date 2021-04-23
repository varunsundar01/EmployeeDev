<template>
  <div>
    <div class="background" @click="toBack"></div>
    <dialog class="edit-dialog" open>
      <h2 class="dialog-header">Update {{ props.editName }}</h2>

      <div class="dialog-body">
        <h3 class="current-value-header">Current Entry</h3>
        <p class="current-value">{{ props.currentValue }}</p>
        <form-element :id="props.editId" :inputStyle="props.editFieldStyle" :inputType="props.editFieldType" @enteredInput="enteredInput" :fieldError="props.fieldError">New Entry</form-element>

        <div class="dialog-buttons">
          <base-button primaryVisible="true" @toNext="toNext">
            <template v-slot:primary>Update</template>
          </base-button>
          <base-button secondaryVisible="true" @toBack="toBack">
            <template v-slot:secondary>Cancel</template>
          </base-button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import FormElement from "../../components/UI/FormElement.vue";
export default {
  props: ["editId", "editName", "currentValue", "editFieldStyle", "editFieldType", "fieldError"],
  components: {
    FormElement,
  },
  setup(props, context) {
    function toBack() {
      context.emit("toBack");
    }
    function toNext() {
      context.emit("toNext");
    }
    function enteredInput(data) {
      context.emit("enteredInput", data);
    }

    return {
      toBack,
      toNext,
      enteredInput,
      props,
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

.edit-dialog {
  position: fixed;
  background-color: var(--background-light);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  overflow: hidden;
  max-width: 90%;
}

.dialog-header {
  text-align: center;
  margin: 0;
  background-color: rgba(111, 89, 223, 0.3);
  padding: 0.75em 1.25em;
  font-weight: 500;
  color: var(--secondary);
}

.dialog-body {
  padding: 1em;
}

.current-value-header {
  font-weight: 500;
  font-size: 1.35em;
  margin-bottom: 0.25em;
}

.current-value {
  margin: 0 auto 1em auto;
  font-size: 1.1em;
}

.dialog-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
