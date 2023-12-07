<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header :header-text="header" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" />
      <con-entity-button
        route-name="EntityList"
        :course-id="courseId"
        :icon-name="ButtonIconNamesEnum.Student"
      />
      <con-add-button
        route-name="AddEntity"
        :course-id="courseId"
        :icon-name="ButtonIconNamesEnum.AddStudent"
        active
      />
      <con-add-button route-name="CreateTask" :icon-name="ButtonIconNamesEnum.Task" />
    </div>
    <div class="page-tabs-block">
      <span class="text-white text-h6 text-weight-regular cursor-pointer">tab1</span>
      <span class="text-white text-h6 text-weight-regular cursor-pointer">tab2</span>
    </div>
    <div class="admin-tabs-page-container flex column items-center">
      entity list
      <!--      <q-inner-loading :showing="!isTasksLoaded" dark color="secondary" style="border-radius: 20px" />-->
    </div>
  </q-page>
</template>

<script lang=ts>
import { computed, defineComponent } from 'vue';
import ConAdminPageHeader from 'components/ConAdminControls/ConAdminPageHeader.vue';
import ConAddButton from 'components/ConAdminControls/ConAddButton.vue';
import ConMainTab from 'components/ConAdminControls/ConMainTab.vue';
import ConEntityButton from 'components/ConAdminControls/ConEntityButton.vue';
import ConBackButton from 'components/ConAdminControls/ConBackButton.vue';
import { ADMIN_COURSES_ROUTE_PARAMS } from 'src/modules/core/constants/routes.consts';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { ConBackButton, ConEntityButton, ConMainTab, ConAddButton, ConAdminPageHeader },
  setup() {
    const route = useRoute();

    const courseId = computed(() => (Array.isArray(route.params.courseId) ?
      route.params.courseId[0] :
      route.params.courseId) || '');

    const header = computed(() => 'Назначение студентов на курс');

    return {
      courseId,

      header,

      ADMIN_COURSES_ROUTE_PARAMS,
      ButtonIconNamesEnum,
    };
  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';
</style>

