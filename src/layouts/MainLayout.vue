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
        <!--      </div>-->
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
import { computed, defineComponent, ref } from 'vue';
import ConHeaderLogo from 'components/ConHeaderLogo/ConHeaderLogo.vue';
import { useRouter } from 'vue-router';
import UserData from 'src/modules/users/components/UserData.vue';
import { UsersService } from 'src/modules/users/services/users.service';
import ConFullPageLoading from 'components/ConFullPageLoading/ConFullPageLoading.vue';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import { useCookie } from 'src/modules/core/utils/Cookie.utils';


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

function useUserData() {
  const usersService = new UsersService();
  const userDataLoaded = computed(() => usersService.currentUserLoadingStatus.code === LoadingStatusCodesEnum.loaded);

  if (!usersService.currentUser) {
    usersService.loadCurrentUser();
  }

  const showPage = computed(() => !!useCookie<string>('jwt').value && userDataLoaded.value);
  // const showPage = ref(false); // пока оставлю, для отладки компонента полноэкранной загрузки

  return {
    showPage,
  };
}
</script>

<style scoped lang="scss">
@import 'src/css/app';
$padding-x: 30px;
$header-height: 84px;
$page-gap: 20px;

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
    //top: 20px;
    //left: 50%;
    //transform: translateX(-50%);
    width: 95vw;
    height: 84px;
    border-radius: 20px;
    @include background-blur-opacity($main-bg, 0.1, 20);
    justify-content: space-between;
    padding: 20px 30px;
  }

  &__page-container {
    width: 95vw;
    max-height: calc(100vh - 84px - 60px - 20px); // высота экрана - высота хидера - паддинги - расстояние между блоками
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
