<template>
  <div class="con-admin-page-header flex justify-between items-center">
    <h3 class="con-admin-page-header__header text-h6 text-weight-regular text-white q-ma-none">{{ headerText }}</h3>
    <div class="con-admin-page-header__additional-label">
      <span v-show="!!additionalColoredText" class="con-admin-page-header__additional-text-colored text-body1 text-secondary">{{ additionalColoredText }}</span>
      <span v-show="!!additionalText" class="con-admin-page-header__additional-text q-pl-sm text-body1 text-white">{{ additionalText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    headerText: {
      type: String,
      required: true,
    },
    additionalColoredText: {
      type: String,
      default: () => undefined,
    },
    additionalText: {
      type: String,
      default: () => undefined,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "src/css/app";

.con-admin-page-header {
  padding: 0 30px;
  @include background-blur-opacity($main-bg, 0.1, 40);
  width: 100%;
  border-radius: 10px;
}
</style>
