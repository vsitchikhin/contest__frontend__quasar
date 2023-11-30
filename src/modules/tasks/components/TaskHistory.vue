<template>
  <div class="task-history">
    <history-card v-for="item in history" :key="item.id" :history-card="item" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import HistoryCard from 'src/modules/tasks/components/HistoryCard.vue';
import { TasksService } from 'src/modules/tasks/services/tasks.service';

export default defineComponent({
  components: { HistoryCard },

  setup() {
    const tasksService = new TasksService();

    const history = computed(() => tasksService.history);

    return {
      history,
    };
  },
});
</script>

<style scoped lang="scss">

</style>
