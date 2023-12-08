<template>
  <q-card flat class="student-task-card row items-center">
    <div class="student-task-card__challenge col-grow row items-center q-pl-xl">
      <span class="student-task-card__challenge-description text-body-1 q-pl-lg">{{ task.description }}</span>
    </div>
    <!--    <q-space class="col-1" />-->
    <div class="student-task-card__rate-icon col-grow row items-center">
      <q-icon name="signal_cellular_alt " size="16px" class="text-secondary col-shrink" />
      <span class="text-body1 text-white q-pl-sm">{{ task.rating }}</span>
    </div>
    <div class="student-task-card__variant col-grow row items-center">
      <span class="text-secondary text-bold text-body1">{{ task.variant }}</span>
      <span class="text-white text-body1 q-pl-sm">вариант</span>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IUserTaskDto } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<IUserTaskDto>,
      required: true,
    },
  },

  setup(props) {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.student-task-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.1);

  &__challenge-description {
    color: $card-font;
    max-width: 40vw;
    width: 40vw;
  }

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
