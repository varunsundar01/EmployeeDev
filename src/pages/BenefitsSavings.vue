<template>
  <base-card>
    <form-element id="implementCost" inputStyle="currency"
      >Implementation Cost</form-element
    >
    <form-element id="savings" inputStyle="currency"
      >Annual Cost Savings</form-element
    >
    <div class="button-group">
      <base-button primaryVisible="true" @toNext="onSubmit">
        <template v-slot:primary>Review</template>
      </base-button>
    </div>
  </base-card>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function onSubmit() {
      router.push("/final-review");
    }

    return {
      onSubmit,
    };
  },
};
</script>
