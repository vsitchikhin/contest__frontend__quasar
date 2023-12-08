<template>
  <div class="con-status-icon" :class="iconWrapperClasses" style="border-radius: 50%">
    <q-icon :name="iconName" size="22px" class="con-status-icon__icon" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TaskStatusesEnum } from 'src/modules/tasks/types/tasks.types';

export default defineComponent({
  props: {
    status: {
      type: String as PropType<TaskStatusesEnum>,
      default: () => TaskStatusesEnum.zero,
    },
  },

  setup(props) {
    const iconName = computed(() => {
      switch (props.status) {
        case TaskStatusesEnum.success: {
          return 'done';
        }
        case TaskStatusesEnum.error: {
          return 'close';
        }
        default: {
          return '';
        }
      }
    });

    const iconWrapperClasses = computed<Record<string, boolean>>(() => ({
      'con-status-icon--success': props.status === TaskStatusesEnum.success,
    }));

    return {
      iconName,
      iconWrapperClasses,
    };
  },
});

</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-status-icon {
  width: 36px;
  height: 36px;
  @include background-blur-opacity($main-bg, 0.1);
  color: $main-font;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  &--success {
    background-color: $secondary;
    color: $card-font;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
