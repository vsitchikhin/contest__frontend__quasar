<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header :header-text="headerText" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" />
      <con-entity-button
        route-name="EntityList"
        :course-id="courseId"
        :icon-name="ButtonIconNamesEnum.Student"
        :active="isStudents"
        :entity-type="EntityTypesEnum.Student"
      />
      <con-entity-button
        route-name="EntityList"
        :course-id="courseId"
        :icon-name="ButtonIconNamesEnum.Group"
        :active="isGroups"
        :entity-type="EntityTypesEnum.Group"
      />
    </div>
    <div class="admin-page-container flex column items-center">
      <div v-show="isStudents" class="cards-container full-width">
        <student-task-card v-for="item in studentTaskList" :key="item.id" :task="item" />
      </div>
      <div v-show="isGroups" class="cards-container full-width">
        <group-task-card v-for="item in groupTaskList" :key="item.id" :task="item" />
      </div>
    </div>
  </q-page>
</template>

<script lang=ts>
import { computed, defineComponent, watch } from 'vue';
import ConBackButton from 'components/ConAdminControls/ConBackButton.vue';
import ConAdminPageHeader from 'components/ConAdminControls/ConAdminPageHeader.vue';
import ConMainTab from 'components/ConAdminControls/ConMainTab.vue';
import { ADMIN_COURSES_ROUTE_PARAMS } from 'src/modules/core/constants/routes.consts';
import ConEntityButton from 'components/ConAdminControls/ConEntityButton.vue';
import { useRoute } from 'vue-router';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import StudentTaskCard from 'src/modules/tasks/components/StudentTaskCard.vue';
import GroupTaskCard from 'src/modules/tasks/components/GroupTaskCard.vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';

export default defineComponent({
  components: { StudentTaskCard, GroupTaskCard, ConEntityButton, ConMainTab, ConAdminPageHeader, ConBackButton },
  setup() {
    const route = useRoute();
    const coursesService = new CoursesService();
    const tasksService = new TasksService();

    const entityType = computed(() => Array.isArray(route.query.entityType)
      ? route.query.entityType[0]
      : route.query.entityType);

    const courseId = computed(() => (Array.isArray(route.params.courseId) ?
      route.params.courseId[0] :
      route.params.courseId) || '');

    const entityId = computed(() => (Array.isArray(route.params.entityId) ?
      route.params.entityId[0] :
      route.params.entityId) || '');

    const courseName = computed(() => coursesService.adminCourses?.find(c => c.id === parseInt(courseId.value))?.name || '');

    const entityButtonIcon = computed(() => entityType.value === 'student'
      ? ButtonIconNamesEnum.Student
      : ButtonIconNamesEnum.Group);

    const group = computed(() => coursesService.courseGroups?.find(g => g.id === parseInt(entityId.value)));
    const student = computed(() => coursesService.courseStudents?.find(s => s.id === parseInt(entityId.value)));

    // ---------------------------------------------------------------
    // Данные для страницы
    const studentTaskList = computed(() => tasksService.studentTaskList);
    const groupTaskList = computed(() => tasksService.groupTaskList);

    // ---------------------------------------------------------------
    // Загрузка данных
    tasksService.loadEntityTaskList((entityType.value as EntityTypesEnum), entityId.value, courseId.value);

    if (!coursesService.adminCourses) {
      coursesService.loadAdminCourses();
    }

    if (entityType.value === EntityTypesEnum.Group && !coursesService.courseGroups) {
      coursesService.loadCourseGroups(courseId.value);
    }

    if (entityType.value === EntityTypesEnum.Student && !coursesService.courseStudents) {
      coursesService.loadCourseStudents(courseId.value);
    }

    watch(entityType, () => tasksService.loadEntityTaskList((entityType.value as EntityTypesEnum), entityId.value, courseId.value));

    // ---------------------------------------------------------------
    // Параметры отображения
    const headerText = computed(() => entityType.value === EntityTypesEnum.Student
      ? `Задачи ${student.value?.name || ''} ${courseName.value}`
      : `Задачи ${group.value?.name || ''} ${courseName.value}`);

    const isStudentTasksLoaded = computed(() => tasksService.studentTaskListLoadingStatus.code === LoadingStatusCodesEnum.loaded);
    const isGroupTasksLoaded = computed(() => tasksService.groupTaskListLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    const isStudents = computed(() => entityType.value === EntityTypesEnum.Student);
    const isGroups = computed(() => entityType.value === EntityTypesEnum.Group);

    const isDataLoaded = computed(() => (
      entityType.value === EntityTypesEnum.Student && isStudentTasksLoaded.value
    ) || (
      entityType.value === EntityTypesEnum.Group && isGroupTasksLoaded.value
    ));

    return {
      courseId,
      entityId,
      entityButtonIcon,

      isStudents,
      isGroups,

      headerText,

      studentTaskList,
      groupTaskList,

      isDataLoaded,

      ADMIN_COURSES_ROUTE_PARAMS,
      ButtonIconNamesEnum,
      EntityTypesEnum,
    };
  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';
</style>

