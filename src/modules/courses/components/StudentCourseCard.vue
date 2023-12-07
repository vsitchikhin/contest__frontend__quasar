<template>
  <q-card flat class="student-card row items-center">
    <div class="student-card__name text-h6 text-white text-weight-regular">
      {{ student.last_name }} {{ student.name }}
    </div>
    <q-btn flat class="student-card__button absolute bg-secondary text-white" @click="gotoStudent">
      <q-icon name="chevron_right" />
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EntityTypesEnum, IUserInfo } from 'src/modules/courses/types/entity.types';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    student: {
      type: Object as PropType<IUserInfo>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();

    function gotoStudent() {
      router.push({
        name: 'EntityTasks',
        params: {
          courseId: route.params.courseId,
          entityId: props.student.id,
        },
        query: {
          entityType: EntityTypesEnum.Student,
        },
      });
    }

    return {
      gotoStudent,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.student-card {
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
