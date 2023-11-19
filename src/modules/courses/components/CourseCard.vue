<template>
  <q-card flat class="course-card row">
    <div class="course-card__name col-grow">
      <span class="course-card__course-name text-h6 text-white text-weight-regular">{{ course.name }}</span>
    </div>
    <q-space class="col-auto" />
    <div class="course-card__progress row col-4 items-center q-pr-lg">
      <q-linear-progress
        size="8px"
        :value="progressStatus"
        track-color="white"
        color="secondary"
        rounded
        class="col-grow"
      />
      <div class="course-card__progress-title coll-grow q-pl-sm">
        <span class="text-body1 text-secondary text-bold">{{ course.success_count }}</span>
        <span class="text-body1 text-white"> / {{ course.count }}</span>
      </div>
    </div>
    <div class="course-card__button absolute absolute-right" />
    <q-btn flat class="course-card__button absolute bg-secondary text-white" @click="gotoCourse">
      <q-icon name="chevron_right" />
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ICourseShortDto } from 'src/modules/courses/types/courses.types';

export default defineComponent({
  props: {
    course: {
      type: Object as PropType<ICourseShortDto>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const progressStatus = computed(() => props.course.success_count / props.course.count);

    function gotoCourse() {
      router.push({ name: 'Course', params: { courseId: props.course.id } });
    }

    return {
      progressStatus,

      gotoCourse,
    };
  },
});

</script>

<style scoped lang="scss">
@import 'src/css/app';

.course-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.01);

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
