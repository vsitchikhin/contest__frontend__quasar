<template>
  <div class="row items-center justify-evenly t-contest-loading">
    <h3 class="text-h3 text-white">
      Загрузка данных...
    </h3>
    <q-circular-progress
      indeterminate
      size="180px"
      :thickness="1"
      color="primary"
      track-color="secondary"
      class="q-ma-md"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConFullPageLoading',
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.t-contest-loading {
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @include background-blur-opacity($primary, 0.5, 40);

  h3 {
    margin-top: -12%;
  }
}
</style>
