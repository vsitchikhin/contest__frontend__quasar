<template>
  <div class="tests-info">
    <div class="test-info__content-container">
      <h3 class="test-info__header">
        Тест {{ testInfo.id }}
      </h3>
      <div class="test-info__row">
        <div class="test-info__title">Данные, которые подавали на вход:</div>
        <div class="test-info__data">{{ testInfo.test_in }}</div>
      </div>
      <div class="test-info__row">
        <div class="test-info__title">Неправильный вывод:</div>
        <div class="test-info__data--secondary">{{ testInfo.test_out }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ITestDto } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  props: {
    testInfo: {
      type: Object as PropType<ITestDto>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.test-info {
  @include background-blur-opacity($main-bg, 0.1);
  border-radius: 0 0 10px 10px;
}
</style>
