<template>
  <q-page class="page-class task">
    <div class="page-content-container task__description flex column justify-between">
      <div class="text-body1">{{ task?.description }}</div>
      <div class="text-body1 flex justify-between">
        <span>Максимальный балл: {{ task?.max_score }}</span>
        <span>Набранные баллы: {{ task?.score }}</span>
      </div>
      <div class="task__button">
        <q-btn no-caps flat :disable="isButtonDisabled" class="text-white bg-secondary" @click="gotoEditor">Перейти к решению</q-btn>
      </div>
    </div>
    <div class="page-content-container task__history">
      <span class="text-h6 text-weight-regular task__history-title">История решений</span>
      <task-history :history="history" />
    </div>
    <con-full-page-loading v-show="isLoading" />
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';
import { useRoute, useRouter } from 'vue-router';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import ConFullPageLoading from 'components/ConFullPageLoading/ConFullPageLoading.vue';
import TaskHistory from 'src/modules/tasks/components/TaskHistory.vue';
import { TaskStatusesEnum } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  components: { TaskHistory, ConFullPageLoading },
  setup() {
    const tasksService = new TasksService();
    const route = useRoute();
    const router = useRouter();

    const taskId = computed(() => Array.isArray(route.params.taskId) ? route.params.taskId[0] : route.params.taskId);
    const isLoading = computed(() => tasksService.taskLoadingStatus.code !== LoadingStatusCodesEnum.loaded);

    tasksService.loadTask(taskId.value);

    const task = computed(() => tasksService.task);
    const history = computed(() => task.value?.history || []);

    const isButtonDisabled = computed(() => task.value?.history && task.value.history[0] && (
      task.value.history[0].status === TaskStatusesEnum.zero ||
        task.value.history[0].status === TaskStatusesEnum.success
    ));

    function gotoEditor() {
      router.push({ name: 'TaskEditor', params: { taskId: taskId.value } });
    }

    return {
      task,
      isLoading,

      history,
      isButtonDisabled,

      gotoEditor,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';
$description-height: 224px;

.task {
  color: $card-font;

  &__description {
    padding: 30px;
    height: $description-height;
  }

  &__history {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    height: calc(100vh - (#{$description-height} + #{$header-height} + #{$main-padding} * 2 + #{$page-gap} * 2));
    border-radius: 10px;
    overflow: auto;
  }
}

.page-class {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
