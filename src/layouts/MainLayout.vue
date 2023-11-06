<template>
  <q-layout view="lHh lpR fFf" class="main-layout">
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
      <!--      </div>-->
    </q-header>

    <!-- todo: настроить дравер как он должен выезжать (или сделать свой)
    <q-drawer v-model="drawerOpen" side="right">
       drawer content
    </q-drawer> -->

    <q-page-container style="padding: 0" class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConHeaderLogo from 'components/ConHeaderLogo/ConHeaderLogo.vue';
import { useRouter } from 'vue-router';
import UserData from 'src/modules/users/components/UserData.vue';


export default defineComponent({
  name: 'MainLayout',
  components: { UserData, ConHeaderLogo },

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
  // todo: доработать для адаптивов
  background-size: 65vw;
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
    //top: 20px;
    //left: 50%;
    //transform: translateX(-50%);
    width: 95vw;
    height: 84px;
    border-radius: 20px;
    @include background-blur-opacity($secondary-bg, 0.1, 20);
    justify-content: space-between;
    padding: 20px 30px;
  }

  &__page-container {
    width: 95vw;
    //max-height: calc(100vh - 84px - 60px - 20px); // высота экрана - высота хидера - паддинги - расстояние между блоками
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
