<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header :header-text="courseName" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" active />
      <con-entity-button
        route-name="EntityList"
        :course-id="courseId"
        :icon-name="ButtonIconNamesEnum.Student"
      />
      <con-add-button
        route-name="AddEntity"
        :course-name="courseId"
        :icon-name="ButtonIconNamesEnum.AddStudent"
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
import { CoursesService } from 'src/modules/courses/services/courses.service';

export default defineComponent({
  components: { ConEntityButton, AdminTaskCard, ConMainTab, ConAddButton, ConAdminPageHeader, ConBackButton },
  setup() {
    const tasksService = new TasksService();
    const coursesService = new CoursesService();
    const route = useRoute();

    const courseId = computed(() => (Array.isArray(route.params.courseId)
      ? route.params.courseId[0]
      : route.params.courseId) || '');

    const courseName = computed(() => coursesService.adminCourses?.find(c => c.id === parseInt(courseId.value))?.name || '');

    const taskList = computed(() => tasksService.adminTaskList);
    const isTasksLoaded = computed(() => tasksService.adminTaskListLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    if (!taskList.value) { // todo: || taskList.value.course !== route.query.courseName) {
      tasksService.loadAdminTaskList(courseId.value);
    }

    return {
      taskList,
      isTasksLoaded,

      courseId,
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

