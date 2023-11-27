<template>
  <q-card flat class="task-card row items-center">
    <div class="task-card__icon col-shrink" :class="iconWrapperClasses" style="border-radius: 50%">
      <q-icon :name="iconName" size="22px" class="task-card__task-icon" />
    </div>
    <div class="task-card__challenge col-grow row items-center q-pl-xl">
      <span class="task-card__challenge-id text-h6 text-white">{{ task.id }}</span>
      <span class="task-card__challenge-description text-body-1 q-pl-lg">{{ task.description }}</span>
    </div>
    <!--    <q-space class="col-1" />-->
    <div class="task-card__rate-icon col-grow row items-center">
      <q-icon name="signal_cellular_alt " size="16px" class="text-secondary col-shrink" />
      <span class="text-body1 text-white q-pl-sm">{{ task.rating }}</span>
    </div>
    <div class="task-card__variant col-grow row items-center">
      <span class="text-secondary text-bold text-body1">{{ task.variant }}</span>
      <span class="text-white text-body1 q-pl-sm">вариант</span>
    </div>
    <div class="task-card__rating row col-grow q-pr-xl items-center">
      <span class="text-secondary text-body1">{{ task.score }}/{{ task.max_score }}</span>
      <span class="text-white text-body1 q-pl-sm">баллов</span>
    </div>
    <q-btn flat class="task-card__button absolute bg-secondary text-white" @click="gotoTask">
      <q-icon name="chevron_right" />
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ITaskDto, TaskStatusesEnum } from 'src/modules/tasks/types/tasks.types';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<ITaskDto>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();


    // ----------------------------------------------------------------
    // Параметры отображения
    const iconName = computed(() => {
      switch (props.task.status) {
        case TaskStatusesEnum.success: {
          return 'done';
        }
        case TaskStatusesEnum.error: {
          return 'close';
        }
        default: {
          return '';
        }
      }
    });

    const iconWrapperClasses = computed<Record<string, boolean>>(() => ({
      'task-card__icon--success': props.task.status === TaskStatusesEnum.success,
    }));

    function gotoTask() {
      router.push({ name: 'Task', params: { taskId: props.task.id } });
    }

    return {
      iconName,
      iconWrapperClasses,

      gotoTask,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.task-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.1);

  &__icon {
    width: 36px;
    height: 36px;
    @include background-blur-opacity($main-bg, 0.1);

    &--success {
      background-color: $secondary;
    }
  }

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
