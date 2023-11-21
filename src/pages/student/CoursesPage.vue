<template>
  <q-page class="page-class">
    <div class="page-container flex column items-center q-pa-lg">
      <course-card v-for="item in courses" :key="item.id" :course="item" />

      <q-inner-loading :showing="coursesLoaded" dark color="secondary" style="border-radius: 20px" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CourseCard from 'src/modules/courses/components/CourseCard.vue';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { LoadingStatusCodesEnum } from 'src/types/base.types';

export default defineComponent({
  components: {
    CourseCard,
  },

  setup() {
    const coursesService = new CoursesService();

    if (!coursesService.courses) {
      coursesService.loadCourses();
    }

    const coursesLoaded = computed(() => coursesService.courseLoadingStatus.code === LoadingStatusCodesEnum.loaded);
    const courses = computed(() => coursesService.courses);
    return {
      coursesLoaded,
      courses,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';
</style>
