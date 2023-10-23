<template>
  <q-page class="row items-center justify-evenly">
    <div class="container-test">
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

.container-test {
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
}
</style>
