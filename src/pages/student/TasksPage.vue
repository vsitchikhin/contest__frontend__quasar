<template>
  <q-page class="page-class">
    <div class="page-container flex column items-center">
      <task-card v-for="item in tasks" :key="item.id" :task="item" />

      <q-inner-loading :showing="!tasksLoaded" dark color="secondary" style="border-radius: 20px" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TaskCard from 'src/modules/tasks/components/TaskCard.vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';
import { useRoute } from 'vue-router';
import { LoadingStatusCodesEnum } from 'src/types/base.types';

export default defineComponent({
  components: { TaskCard },
  setup() {
    const tasksService = new TasksService();
    const route = useRoute();

    const courseId = computed(() => Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId);

    tasksService.loadTaskList(courseId.value);

    const tasks = computed(() => tasksService.taskList);
    const tasksLoaded = computed(() => tasksService.taskListLoadingStatus.code === LoadingStatusCodesEnum.loaded);

    return {
      tasks,
      tasksLoaded,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';
</style>
