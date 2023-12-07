<template>
  <div class="task-history">
    <history-card v-for="item in history" :key="item.id" :history-card="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import HistoryCard from 'src/modules/tasks/components/HistoryCard.vue';
import { ITaskHistory } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  components: { HistoryCard },

  props: {
    history: {
      type: Array as PropType<ITaskHistory[]>,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.task-history {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
