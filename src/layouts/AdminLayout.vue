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

      <div class="main-layout__content-container flex">
        <div class="main-layout__sidebar flex column">
          <span class="main-layout__sidebar-link text-body1" :class="getLinkClass(SidebarLinksEnum.courses)" @click="gotoCourses">Курсы</span>
          <span class="main-layout__sidebar-link text-body1" :class="getLinkClass(SidebarLinksEnum.users)" @click="gotoUsers">Пользователи</span>
        </div>
        <q-page-container style="padding: 0" class="main-layout__page-container">
          <router-view />
        </q-page-container>
      </div>
    </template>
    <template v-else>
      <con-full-page-loading />
    </template>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConHeaderLogo from 'components/ConHeaderLogo/ConHeaderLogo.vue';
import ConFullPageLoading from 'components/ConFullPageLoading/ConFullPageLoading.vue';
import UserData from 'src/modules/users/components/UserData.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserData } from 'src/modules/core/composables/useUserData';
import { SidebarLinksEnum } from 'src/modules/core/types/layout.types';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    ConFullPageLoading,
    UserData,
    ConHeaderLogo,
  },

  setup () {
    const router = useRouter();
    const route = useRoute();

    function gotoMain() {
      router.push('/');
    }

    function getLinkClass(link: SidebarLinksEnum) {
      if (link === SidebarLinksEnum.users && route.name?.toString().includes('User')) {
        return 'main-layout__sidebar-link--active';
      } else if (link === SidebarLinksEnum.courses && !route.name?.toString().includes('User')) {
        return 'main-layout__sidebar-link--active';
      }

      return '';
    }

    function gotoCourses() {
      router.push({ name: 'AdminCourses' });
    }

    function gotoUsers() {
      router.push({ name: 'Users' });
    }

    return {
      gotoMain,
      getLinkClass,
      gotoCourses,
      gotoUsers,

      ...useUserData(),
    };
  },
  computed: {
    SidebarLinksEnum () {
      return SidebarLinksEnum;
    },
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

$sidebar-width: 304px;

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
  gap: $page-gap;
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

  &__content-container {
    gap: $page-gap;
    flex-wrap: nowrap;
  }

  &__sidebar {
    width: $sidebar-width;
    padding: 30px;
    @include background-blur-opacity($main-bg, 0.1, 20);
    border-radius: 20px;
    height: calc(100vh - #{$header-height} - #{$main-padding} * 2 - #{$page-gap});
    gap: $page-gap;
  }

  &__sidebar-link {
    cursor: pointer;
    color: $secondary-font;
    transition: color 0.3s;

    &:hover {
      color: $main-font;
      transition: color 0.3s;
    }

    &--active {
      color: $card-font;
      transition: color 0.3s;
    }
  }

  &__page-container {
    width: calc(95vw - #{$sidebar-width} - #{$page-gap});
    max-height: calc(100vh - #{$header-height} - #{$main-padding} * 2 - #{$page-gap} * 2 - #{$activity-block-height});
    border-radius: 20px;
    min-height: unset;
  }

  &__user-data {
    display: flex;
    gap: $page-gap;
    justify-content: center;
    align-items: center;
  }
}
</style>
