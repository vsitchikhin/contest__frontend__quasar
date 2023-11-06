<template>
  <q-page class="row items-center justify-evenly t-contest-loading">
    <h3 class="text-h3 text-dark">
      Загрузка данных...
    </h3>
    <q-circular-progress
      indeterminate
      size="180px"
      :thickness="1"
      color="primary"
      track-color="blue-grey-8"
      class="q-ma-md"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConFullPageLoading',
});
</script>

<style scoped lang="scss">
.t-contest-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $blue-grey-1;

  h3 {
    margin-top: -12%;
  }
}
</style>
