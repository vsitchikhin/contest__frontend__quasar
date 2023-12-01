<template>
  <q-page class="page-class editor">
    <div class="page-content-container">
      {{ task?.description }}
    </div>
    <div class="page-content-container flex column editor__container">
      <span class="text-h6 editor__title text-weight-regular">Редактор</span>
      <con-code-editor v-model="solution" />
      <div class="editor__button-container">
        <q-btn flat no-caps class="text-white bg-secondary" @click="submitTask">
          Отправить на проверку
        </q-btn>
      </div>
    </div>
    <con-full-page-loading v-if="!isTaskLoaded" />
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ConCodeEditor from 'components/ConCodeEditor/ConCodeEditor.vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';
import { useRoute, useRouter } from 'vue-router';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import ConFullPageLoading from 'components/ConFullPageLoading/ConFullPageLoading.vue';

export default defineComponent({
  components: { ConFullPageLoading, ConCodeEditor },
  setup () {
    const taskService = new TasksService();
    const route = useRoute();
    const router = useRouter();

    const taskId = computed(() => Array.isArray(route.params.taskId) ? route.params.taskId[0] : route.params.taskId);
    const task = computed(() => taskService.task);

    const isTaskLoaded = computed(() => taskService.taskLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    const solution = ref('');

    if (!taskService.task) {
      taskService.loadTask(taskId.value);
    }

    function submitTask() {
      console.log(solution.value);
      taskService.submitTask(solution.value);
      router.push({ name: 'Task', params: { taskId: route.params.taskId } });
    }

    return {
      task,
      isTaskLoaded,

      solution,

      submitTask,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.editor {
  color: $card-font;

  &__container {
    gap: $page-gap;
  }
}

.page-class {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
