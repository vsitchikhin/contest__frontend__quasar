<template>
  <div class="tests-info">
    <div class="test-info__content-container">
      <h3 class="test-info__header text-h5 text-secondary text-weight-medium q-ma-none">
        Тест {{ testInfo.id }}
      </h3>
      <div class="row items-center">
        <div class="test-info__title text-h6 text-weight-regular q-ma-none col-3">Данные, которые подавали на вход:</div>
        <div class="test-info__data text-body1">{{ testInfo.test_in }}</div>
      </div>
      <div class="row items-center">
        <div class="test-info__title text-h6 text-weight-regular q-ma-none col-3">Неправильный вывод:</div>
        <div class="test-info__data text-body1 text-secondary text-weight-regular">{{ testInfo.test_out }}</div>
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
  &__content-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    @include background-blur-opacity($main-bg, 0.05);
    border-radius: 10px;
    padding: 20px;
  }

  &__data {
    @include background-blur-opacity($primary, 0.5);
    padding: 20px 30px;
    border-radius: 10px;
    max-width: 60%;
  }
}
</style>
