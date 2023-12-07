<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header :header-text="courseName" />
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
      <div v-show="isStudents" class="cards-container full-width">
        <student-course-card v-for="item in studentsList" :key="item.id" :student="item" />
      </div>
      <div v-show="isGroups" class="cards-container full-width">
        <group-course-card v-for="item in groupsList" :key="item.id" :group="item" />
      </div>
      <q-inner-loading :showing="!isDataLoaded" dark color="secondary" style="border-radius: 20px" />
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
import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import StudentCourseCard from 'src/modules/courses/components/StudentCourseCard.vue';
import GroupCourseCard from 'src/modules/courses/components/GroupCourseCard.vue';

export default defineComponent({
  components: { GroupCourseCard, StudentCourseCard, ConEntityTabs, ConBackButton, ConEntityButton, ConMainTab, ConAddButton, ConAdminPageHeader },
  setup() {
    const coursesService = new CoursesService();
    const route = useRoute();
    const router = useRouter();

    const entityType = computed(() => Array.isArray(route.query.entityType)
      ? route.query.entityType[0]
      : route.query.entityType);

    const courseId = computed(() => (Array.isArray(route.params.courseId) ?
      route.params.courseId[0] :
      route.params.courseId) || '');

    const courseName = computed(() => coursesService.adminCourses?.find(c => c.id === parseInt(courseId.value))?.name || '');

    // ---------------------------------------------------------------
    // Загрузка данных
    coursesService.loadEntityList(entityType.value as EntityTypesEnum, courseId.value);

    const studentsList = computed(() => coursesService.courseStudents);
    const groupsList = computed(() => coursesService.courseGroups);

    // ---------------------------------------------------------------
    // Параметры отображения
    const isStudentsLoaded = computed(() => coursesService.courseStudentsLoadingStatus.code === LoadingStatusCodesEnum.loaded);
    const isGroupsLoaded = computed(() => coursesService.courseGroupsLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    const isStudents = computed(() => entityType.value === EntityTypesEnum.Student);
    const isGroups = computed(() => entityType.value === EntityTypesEnum.Group);

    const isDataLoaded = computed(() => (
      entityType.value === EntityTypesEnum.Student && isStudentsLoaded.value
    ) || (
      entityType.value === EntityTypesEnum.Group && isGroupsLoaded.value
    ));

    const entityButtonIcon = computed(() => entityType.value === 'student'
      ? ButtonIconNamesEnum.Student
      : ButtonIconNamesEnum.Group);
    const addEntityButtonIcon = computed(() => entityType.value === 'student'
      ? ButtonIconNamesEnum.AddStudent
      : ButtonIconNamesEnum.AddGroup);

    const activeTab = ref(entityTabs.find(t => t.entityType === entityType.value) || entityTabs[0]);

    watch(activeTab, () => {
      router.push({ query: { entityType: activeTab.value.entityType } });
      coursesService.loadEntityList(activeTab.value.entityType, courseId.value);
    });

    return {
      courseId,
      courseName,

      entityButtonIcon,
      addEntityButtonIcon,

      activeTab,
      entityTabs,

      isDataLoaded,
      isStudents,
      isGroups,

      studentsList,
      groupsList,

      ADMIN_COURSES_ROUTE_PARAMS,
      ButtonIconNamesEnum,
    };  },
});
</script>

<style scoped lang=scss>
@import 'src/css/app';
</style>

