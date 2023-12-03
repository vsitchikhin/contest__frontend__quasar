<template>
  <q-card class="admin-task-card row-items-center">
    <div class="admin-task-card__challenge col-grow row items-center q-pl-xl">
      <span class="admin-task-card__challenge-description text-body-1 q-pl-lg">{{ task.description }}</span>
    </div>
    <div class="admin-task-card__rate-icon col-grow row items-center">
      <q-icon name="signal_cellular_alt " size="16px" class="text-secondary col-shrink" />
      <span class="admin-text-body1 text-white q-pl-sm">{{ task.rating }}</span>
    </div>
    <div class="admin-task-card__variant col-grow row items-center">
      <span class="admin-text-secondary text-bold text-body1">{{ task.variant_count }}</span>
      <span class="admin-text-white text-body1 q-pl-sm">вариант</span>
    </div>
    <!--<div class="task-card__rating row col-grow q-pr-xl items-center">
      <span class="text-secondary text-body1">{{ task.score }}/{{ task.max_score }}</span>
      <span class="text-white text-body1 q-pl-sm">баллов</span>
    </div>
    <q-btn flat class="task-card__button absolute bg-secondary text-white" @click="gotoTask">
      <q-icon name="chevron_right" />
    </q-btn>-->
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IAdminTaskDto } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<IAdminTaskDto>,
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

.admin-task-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.1);

  &__challenge-description {
    color: $card-font;
    max-width: 40vw;
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
