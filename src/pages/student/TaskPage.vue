<template>
  <q-page class="page-class task">
    <div class="page-content-container task__description q-pa-lg">
      <div class="text-body1">{{ task?.description }}</div>
      <div class="text-body1">Максимальный балл: {{ task?.max_score }}</div>
      <q-btn class="text-white">Перейти к решению</q-btn>
    </div>
    <div class="page-content-container task__history q-pa-lg">
      history
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const tasksService = new TasksService();
    const route = useRoute();
    const router = useRouter();

    const taskId = computed(() => Array.isArray(route.params.taskId) ? route.params.taskId[0] : route.params.taskId);



    tasksService.setActiveTask(taskId.value);

    const task = computed(() => tasksService.task);

    function gotoEditor() {
      router.push({ name: 'TaskEditor', params: { taskId: taskId.value } });
    }

    return {
      task,

      gotoEditor,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.task {
  color: $card-font;

  &__description {

  }

  &__history {

  }
}

.page-class {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
