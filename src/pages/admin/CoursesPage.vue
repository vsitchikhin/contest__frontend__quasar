<template>
  <q-page class="admin-page-class">
    <div class="page-activity-block" />
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

export default defineComponent({
  components: { AdminCourseCard },
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
