<template>
  <q-page class="page-class editor">
    <div class="page-content-container">
      page
    </div>
    <div class="page-content-container">
      content
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.editor {
  color: $card-font
}

.page-class {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
