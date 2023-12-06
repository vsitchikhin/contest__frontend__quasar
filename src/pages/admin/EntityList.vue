<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header header-text="Курсы" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" />
      <con-entity-button
        route-name="EntityList"
        :course-id="courseId"
        :icon-name="entityButtonIcon"
        active
      />
      <con-add-button
        route-name="AddEntity"
        :course-id="courseId"
        :icon-name="addEntityButtonIcon"
      />
      <con-add-button route-name="CreateTask" :icon-name="ButtonIconNamesEnum.Task" />
    </div>
    <con-entity-tabs v-model="activeTab" :tabs="entityTabs" />
    <div class="admin-tabs-page-container flex column items-center">
      entity list
      <!--      <q-inner-loading :showing="!isTasksLoaded" dark color="secondary" style="border-radius: 20px" />-->
    </div>
  </q-page>
</template>

<script lang=ts>
import { computed, defineComponent, ref, watch } from 'vue';
import ConAdminPageHeader from 'components/ConAdminControls/ConAdminPageHeader.vue';
import ConAddButton from 'components/ConAdminControls/ConAddButton.vue';
import ConMainTab from 'components/ConAdminControls/ConMainTab.vue';
import ConEntityButton from 'components/ConAdminControls/ConEntityButton.vue';
import ConBackButton from 'components/ConAdminControls/ConBackButton.vue';
import { useRoute, useRouter } from 'vue-router';
import { ADMIN_COURSES_ROUTE_PARAMS } from 'src/modules/core/constants/routes.consts';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import ConEntityTabs from 'components/ConEntityTabs/ConEntityTabs.vue';
import { entityTabs } from 'src/modules/courses/consts/entities.consts';

export default defineComponent({
  components: { ConEntityTabs, ConBackButton, ConEntityButton, ConMainTab, ConAddButton, ConAdminPageHeader },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const entityType = computed(() => Array.isArray(route.query.entityType)
      ? route.query.entityType[0]
      : route.query.entityType);

    const courseId = computed(() => (Array.isArray(route.params.courseId) ?
      route.params.courseId[0] :
      route.params.courseId) || '');

    const entityButtonIcon = computed(() => entityType.value === 'student'
      ? ButtonIconNamesEnum.Student
      : ButtonIconNamesEnum.Group);
    const addEntityButtonIcon = computed(() => entityType.value === 'student'
      ? ButtonIconNamesEnum.AddStudent
      : ButtonIconNamesEnum.AddGroup);

    const activeTab = ref(entityTabs.find(t => t.entityType === entityType.value) || entityTabs[0]);

    watch(activeTab, () => {
      router.push({ query: { entityType: activeTab.value.entityType } });
    });

    return {
      courseId,

      entityButtonIcon,
      addEntityButtonIcon,

      activeTab,
      entityTabs,

      ADMIN_COURSES_ROUTE_PARAMS,
      ButtonIconNamesEnum,
    };  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';
</style>

