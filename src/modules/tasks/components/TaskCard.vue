<template>
  <q-card flat class="task-card row items-center">
    <con-status-icon :status="task.status" />
    <div class="task-card__challenge col-grow row items-center q-pl-xl">
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
import { defineComponent, PropType } from 'vue';
import { ITaskDto } from 'src/modules/tasks/types/tasks.types';
import { useRouter } from 'vue-router';
import ConStatusIcon from 'components/ConStatusIcon/ConStatusIcon.vue';

export default defineComponent({
  components: { ConStatusIcon },
  props: {
    task: {
      type: Object as PropType<ITaskDto>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    function gotoTask() {
      router.push({ name: 'Task', params: { taskId: props.task.id } });
    }

    return {
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
