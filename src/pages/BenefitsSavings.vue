<template>
  <base-card>
    <form>
      <form-element id="implementCost" inputStyle="currency">Implementation Cost</form-element>
      <form-element id="savings" inputStyle="currency">Annual Cost Savings</form-element>
      <div class="button-group">
        <base-button primaryVisible="true">
          <template v-slot:primary>Review</template>
        </base-button>
      </div>
    </form>
  </base-card>
</template>
