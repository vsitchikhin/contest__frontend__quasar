<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header header-text="Курсы" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" active />
      <con-entity-button
        route-name="EntityList"
        :course-name="courseName"
        :icon-name="ButtonIconNamesEnum.Student"
      />
      <con-add-button
        route-name="AddEntity"
        :course-name="courseName"
        :icon-name="ButtonIconNamesEnum.Student"
      />
      <con-add-button route-name="CreateTask" :icon-name="ButtonIconNamesEnum.Task" />
    </div>
    <div class="admin-page-container flex column items-center">
      <admin-task-card v-for="item in taskList" :key="item.id" :task="item" />

      <q-inner-loading :showing="!isTasksLoaded" dark color="secondary" style="border-radius: 20px" />
    </div>
  </q-page>
</template>

<script lang=ts>
import { computed, defineComponent } from 'vue';
import ConBackButton from 'components/ConAdminControls/ConBackButton.vue';
import ConAdminPageHeader from 'components/ConAdminControls/ConAdminPageHeader.vue';
import ConAddButton from 'components/ConAdminControls/ConAddButton.vue';
import ConMainTab from 'components/ConAdminControls/ConMainTab.vue';
import { ADMIN_COURSES_ROUTE_PARAMS } from 'src/modules/core/constants/routes.consts';
import AdminTaskCard from 'src/modules/tasks/components/AdminTaskCard.vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import { useRoute } from 'vue-router';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import ConEntityButton from 'components/ConAdminControls/ConEntityButton.vue';

export default defineComponent({
  components: { ConEntityButton, AdminTaskCard, ConMainTab, ConAddButton, ConAdminPageHeader, ConBackButton },
  setup() {
    const tasksService = new TasksService();
    const route = useRoute();

    const courseName = computed(() => (Array.isArray(route.query.courseName)
      ? route.query.courseName[0]
      : route.query.courseName) || '');

    const taskList = computed(() => tasksService.adminTaskList);
    const isTasksLoaded = computed(() => tasksService.adminTaskListLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    if (!taskList.value) { // todo: || taskList.value.course !== route.query.courseName) {
      tasksService.loadAdminTaskList(courseName.value);
    }

    return {
      taskList,
      isTasksLoaded,

      courseName,

      ADMIN_COURSES_ROUTE_PARAMS,
      ButtonIconNamesEnum,
    };
  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';
</style>

