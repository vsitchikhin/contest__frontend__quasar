<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block" />
    <div class="admin-page-container flex items-center justify-center text-h2 text-white">
      Данная страница на данный момент находится в разработке
    </div>
  </q-page>
</template>

<script lang=ts>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';

.page-class {
  display: flex;
  flex-direction: column;
  gap: $page-gap;
}
</style>

