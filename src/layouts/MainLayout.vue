<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <header class="main-layout__header">
<!--      <layout-header />-->
    </header>

    <q-page-container class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.main-layout {
  background-color: $main;
  background-image: url('assets/static/Logo.png');
  background-size: 80vw;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 0;

  &__header {
    width: 95vw;
    height: 84px;
    border-radius: 20px;
    @include background-blur-opacity($secondary-bg, 0.1, 20);
  }

  &__page-container {
    width: 95vw;
    border-radius: 20px;
    @include background-blur-opacity($secondary-bg, 0.1, 20);
  }
}
</style>
