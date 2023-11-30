<template>
  <con-dropdown v-model="isDropdownOpen" class="history-card">
    <template #main>
      <div class="history-card__card-container row items-center" :class="cardContainerClasses" @click="openDropdown">
        <con-status-icon class="col-shrink" :status="historyCard.status" />
        <div class="history-card__description q-pl-lg col-auto">{{ historyTitle }}</div>
        <q-space class="col-auto" />
        <div class="history-card__score">
          <span class="history-card__score-number">{{ historyCard.score }}</span>
          баллов
        </div>
        <q-icon :name="dropdownIcon" class="history-card__dropdown-icon" />
      </div>
    </template>
    <template #opening>
      <div class="history-card__tests-container">
        <test-info v-for="item in historyCard.tests" :key="item.id" :test-info="item" />
      </div>
    </template>
  </con-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import ConStatusIcon from 'components/ConStatusIcon/ConStatusIcon.vue';
import ConDropdown from 'components/ConDropdown/ConDropdown.vue';
import TestInfo from 'src/modules/tasks/components/TestInfo.vue';
import { ITaskHistory, TaskStatusesEnum } from 'src/modules/tasks/types/tasks.types';
import { usePluralization } from 'src/modules/core/utils/Strings.utils';


export default defineComponent({
  components: {
    ConStatusIcon,
    ConDropdown,
    TestInfo,
  },

  props: {
    historyCard: {
      type: Object as PropType<ITaskHistory>,
      required: true,
    },
  },

  setup(props) {
    const titlePlural = usePluralization('Ошибок нет, но неправильно | Ошибка в {n} тесте | Ошибка в {n} тестах | Ошибка в {n} тестах');
    const historyTitle = computed(() => {
      if (props.historyCard.status === TaskStatusesEnum.success) {
        return 'Отправлено успешное решение';
      }

      return titlePlural.$t(props.historyCard.tests.length);
    });

    const isDropdownOpen = ref(false);
    const dropdownIcon = computed(() => isDropdownOpen.value ? 'chevron_up' : 'chevron_down');
    const isCardDisabled = computed(() => !props.historyCard.tests.length);

    const cardContainerClasses = computed(() => ({
      'history-card__card-container--open': isDropdownOpen.value,
    }));


    function openDropdown() {
      if (!isCardDisabled.value) {
        isDropdownOpen.value = !isDropdownOpen.value;
      }
    }

    return {
      dropdownIcon,

      historyTitle,

      isDropdownOpen,
      isCardDisabled,

      cardContainerClasses,

      openDropdown,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.history-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;

  &__card-container {
    border-radius: 10px;
    display: flex;
    padding: 20px 30px;
    @include background-blur-opacity($main-bg, 0.1);

    &--open {
      border-radius: 10px 10px 0 0;
    }
  }

  &__test-container {
    border-radius: 0 0 10px 10px;
    @include background-blur-opacity($main-bg, 0.1);
  }

}
</style>
