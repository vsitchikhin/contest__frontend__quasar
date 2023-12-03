<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block">
      <con-back-button />
      <con-admin-page-header header-text="Курсы" />
      <con-main-tab :route-params="ADMIN_COURSES_ROUTE_PARAMS" active />
      <con-add-button route-name="CreateTask" />
    </div>
    <div class="admin-page-container flex column items-center">
      <admin-course-card v-for="item in courses" :key="item.name" :course="item" />

      <q-inner-loading :showing="!isCoursesLoaded" dark color="secondary" style="border-radius: 20px" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import AdminCourseCard from 'src/modules/courses/components/AdminCourseCard.vue';
import ConBackButton from 'components/ConAdminControls/ConBackButton.vue';
import ConAdminPageHeader from 'components/ConAdminControls/ConAdminPageHeader.vue';
import ConMainTab from 'components/ConAdminControls/ConMainTab.vue';
import { ADMIN_COURSES_ROUTE_PARAMS } from 'src/modules/core/constants/routes.consts';
import ConAddButton from 'components/ConAdminControls/ConAddButton.vue';

export default defineComponent({
  components: { ConAddButton, ConMainTab, ConAdminPageHeader, ConBackButton, AdminCourseCard },
  setup() {
    const coursesService = new CoursesService();

    const isCoursesLoaded = computed(() => coursesService.adminCoursesLoadingStatus.code === LoadingStatusCodesEnum.loaded);
    const courses = computed(() => coursesService.adminCourses);

    if (!courses.value) {
      coursesService.loadAdminCourses();
    }

    return {
      isCoursesLoaded,
      courses,

      ADMIN_COURSES_ROUTE_PARAMS,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.page-class {
  display: flex;
  flex-direction: column;
  gap: $page-gap;
}
</style>
