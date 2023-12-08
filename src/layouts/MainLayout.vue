<template>
  <q-layout view="lHh lpR fFf" class="main-layout">
    <template v-if="showPage">
      <q-header class="main-layout__header">
        <con-header-logo class="cursor-pointer" @click="gotoMain" />
        <user-data />
        <!-- <q-btn
                    dense
                    flat
                    icon="menu"
                    size="20px"
                    round
                    @click="toggleDrawer"
                  /> -->
      </q-header>

      <!-- todo: настроить дравер как он должен выезжать (или сделать свой)
      <q-drawer v-model="drawerOpen" side="right">
         drawer content
      </q-drawer> -->

      <q-page-container style="padding: 0" class="main-layout__page-container">
        <router-view />
      </q-page-container>
    </template>
    <template v-else>
      <con-full-page-loading />
    </template>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConHeaderLogo from 'components/ConHeaderLogo/ConHeaderLogo.vue';
import { useRouter } from 'vue-router';
import UserData from 'src/modules/users/components/UserData.vue';
import ConFullPageLoading from 'components/ConFullPageLoading/ConFullPageLoading.vue';
import { useUserData } from 'src/modules/core/composables/useUserData';


export default defineComponent({
  name: 'MainLayout',
  components: {
    ConFullPageLoading,
    UserData,
    ConHeaderLogo,
  },

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

      ...useUserData(),
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.main-layout {
  background-color: $primary;
  background-image: url('assets/static/Logo.png');
  // todo: доработать для адаптивов
  background-size: 65vw;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 0;
  max-height: 100vh;
  overflow: hidden;

  &__header {
    display: flex;
    position: unset;
    width: 95vw;
    height: 84px;
    border-radius: 20px;
    @include background-blur-opacity($main-bg, 0.1, 20);
    justify-content: space-between;
    padding: 20px 30px;
  }

  &__page-container {
    width: 95vw;
    max-height: calc(100vh - #{$header-height} - #{$main-padding} * 2 - #{$page-gap});
    border-radius: 20px;
    min-height: unset;
  }

  &__user-data {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
}
</style>
