<template>
  <q-card flat class="admin-task-card row items-center justify-between">
    <div class="admin-task-card__challenge col-grow row items-center">
      <span class="admin-task-card__challenge-description text-body1">{{ task.description }}</span>
    </div>
    <div class="admin-task-card__rate-icon col-grow row items-center">
      <q-icon name="signal_cellular_alt " size="25px" class="text-secondary col-shrink" />
      <span class="text-h6 text-weight-regular text-white q-pl-sm">{{ task.rating }}</span>
    </div>
    <div class="admin-task-card__variant row items-center">
      <span class="text-secondary text-bold text-h6 text-weight-regular">{{ task.variant_count }}</span>
      <span class="text-h6 text-weight-regular q-pl-sm">{{ variantsPlural.$t(task.variant_count) }}</span>
    </div>
    <!--<div class="task-card__rating row col-grow q-pr-xl items-center">
      <span class="text-secondary text-body1">{{ task.score }}/{{ task.max_score }}</span>
      <span class="text-white text-body1 q-pl-sm">баллов</span>
    </div>
    <q-btn flat class="task-card__button absolute bg-secondary text-white" @click="gotoTask">
      <q-icon name="chevron_right" />
    </q-btn>-->
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IAdminTaskDto } from 'src/modules/tasks/types/tasks.types';
import { usePluralization } from 'src/modules/core/utils/Strings.utils';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<IAdminTaskDto>,
      required: true,
    },
  },

  setup() {
    const variantsPlural = usePluralization('Нет вариантов | вариант | варианта | вариантов');

    return {
      variantsPlural,
    };
  },
});

</script>

<style scoped lang="scss">
@import 'src/css/app';

.admin-task-card {
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.01);

  &__challenge-description {
    color: $card-font;
    max-width: 40vw;
  }

  &__button {
    top: 0;
    right: 0;
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 10px 10px 0;
  }

  &__variant {
    color: $card-font
  }
}
</style>
