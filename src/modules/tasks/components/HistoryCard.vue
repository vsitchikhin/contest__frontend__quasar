<template>
  <con-dropdown v-model="isDropdownOpen" class="history-card" :class="cardClasses">
    <template #main>
      <div class="history-card__card-container row items-center" @click="openDropdown">
        <con-status-icon class="col-shrink" :status="historyCard.status" />
        <div class="history-card__description q-pl-lg col-auto text-h6 text-weight-regular">{{ historyTitle }}</div>
        <q-space class="col-auto" />
        <div class="history-card__score text-weight-medium text-body1">
          <span class="text-secondary">{{ historyCard.score }}</span>
          баллов
        </div>
        <q-icon :name="dropdownIcon" size="25px" class="history-card__dropdown-icon q-pl-md" />
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
    const dropdownIcon = computed(() => isDropdownOpen.value ? 'expand_less' : 'expand_more');
    const isCardDisabled = computed(() => !props.historyCard.tests.length);

    const cardClasses = computed(() => ({
      'history-card--open': isDropdownOpen.value,
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

      cardClasses,

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
  border-radius: 10px;
  @include background-blur-opacity($main-bg, 0.02);
  //@include background-blur-opacity($primary, 0.3);

  &__card-container {
    display: flex;
    padding: 20px 30px;
  }

  &__tests-container {
    padding: 20px 30px;
  }

}
</style>
