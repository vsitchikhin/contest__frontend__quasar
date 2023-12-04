<template>
  <q-card flat class="admin-course-card row items-center">
    <div class="admin-course-card__name col-grow">
      <span class="admin-course-card__course-name text-h6 text-white text-weight-regular">{{ course.name }}</span>
    </div>
    <q-space class="col-auto" />
    <div class="admin-course-card__progress-title coll-grow q-pr-xl flex items-center">
      <span class="text-body1 text-secondary q-pr-sm">{{ course.count }}</span>
      <span class="text-body1 text-white">{{ tasksPlural.$t(course.count) }}</span>
    </div>
    <div class="admin-course-card__button absolute absolute-right" />
    <q-btn flat class="admin-course-card__button absolute bg-secondary text-white" @click="gotoCourse">
      <q-icon name="chevron_right" />
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { IAdminCourseDto } from 'src/modules/courses/types/courses.types';
import { usePluralization } from 'src/modules/core/utils/Strings.utils';

export default defineComponent({
  props: {
    course: {
      type: Object as PropType<IAdminCourseDto>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const tasksPlural = usePluralization('Нет задач | задача | задачи | задач');

    function gotoCourse() {
      router.push({ name: 'AdminCourse', query: { courseName: props.course.name } });
    }

    return {
      tasksPlural,

      gotoCourse,
    };
  },
});

</script>

<style scoped lang="scss">
@import 'src/css/app';

.admin-course-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.1);

  &__button {
    top: 0;
    right: 0;
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 10px 10px 0;
  }
}

</style>
