<template>
  <q-page style="min-height: 0" class="main-page row items-center justify-evenly q-pt-none">
    <h1 class="text-h1 text-primary">
      main page
    </h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup () {

    return {  };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.main-page {
  max-height: calc(100vh - #{$header-height} - #{$main-padding} * 2 - #{$page-gap}); // высота экрана - высота хидера - паддинги - расстояние между блоками
  height: 100vh;
  width: 95vw;
  border-radius: 20px;
  @include background-blur-opacity($main-bg, 0.1, 20);

  &__wrapper {
    overflow: scroll;
    height: 80%;
  }
}
</style>
