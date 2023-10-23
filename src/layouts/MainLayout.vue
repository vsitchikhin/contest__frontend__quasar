<template>
  <q-layout view="lHh lpR fFf" class="main-layout">
    <q-header class="main-layout__header">
      <con-header-logo class="cursor-pointer" @click="gotoMain" />
      <q-btn
        dense
        flat
        icon="menu"
        size="20px"
        round
        @click="toggleDrawer"
      />
    </q-header>

    <!-- todo: настроить дравер как он должен выезжать (или сделать свой)
    <q-drawer v-model="drawerOpen" side="right">
       drawer content
    </q-drawer>
    -->

    <q-page-container class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConHeaderLogo from 'components/ConHeaderLogo/ConHeaderLogo.vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'MainLayout',
  components: { ConHeaderLogo },

  setup () {
    const router = useRouter();

    function gotoMain() {
      router.push('/');
    }

    // -----------------------------------------------------------------
    // Параметры отображения
    const drawerOpen = ref(false);

    function toggleDrawer() {
      drawerOpen.value = !drawerOpen.value;
    }

    return {
      drawerOpen,

      toggleDrawer,
      gotoMain,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';
$padding-x: 30px;
$header-height: 84px;
$page-gap: 20px;

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
    display: flex;
    position: unset;
    width: 95vw;
    height: 84px;
    border-radius: 20px;
    @include background-blur-opacity($secondary-bg, 0.1, 20);
    justify-content: space-between;
    padding: 20px 30px;
  }

  &__header-logo {
  }

  &__page-container {
    width: 95vw;
    height: calc(100vh - 84px - 60px - 20px); // высота экрана - высота хидера - паддинги - расстояние между блоками
    border-radius: 20px;
    @include background-blur-opacity($secondary-bg, 0.1, 20);
  }
}
</style>
