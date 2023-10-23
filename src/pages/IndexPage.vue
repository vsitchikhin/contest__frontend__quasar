<template>
  <q-page class="main-page row items-center justify-evenly q-pt-none">
    <div class="">
      <h1>test container</h1>
      <div class="wrapper-test">test wrapper</div>
    </div>
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
  width: 95vw;
  max-height: calc(100vh - 84px - 60px - 20px); // высота экрана - высота хидера - паддинги - расстояние между блоками
  border-radius: 20px;
  @include background-blur-opacity($secondary-bg, 0.1, 20);
}

/*.container-test {
  position: relative;
  background-color: $main;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  h1 {
    color: $main-text;
    font-size: 200px;
    line-height: 240px;
    font-weight: 900;
  }
}

.wrapper-test {
  @include background-blur-opacity($secondary, 0.4, 20);
  width: 80vw;
  height: 200px;
  position: absolute;
  top: calc(50% - 100px);
  left: 10vw;
}*/
</style>
