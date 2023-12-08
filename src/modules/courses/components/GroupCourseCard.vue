<template>
  <q-card flat class="group-card row items-center">
    <div class="group-card__name text-h6 text-white text-weight-regular">
      {{ group.name }}
    </div>
    <q-btn flat class="group-card__button absolute bg-secondary text-white" @click="gotoGroup">
      <q-icon name="chevron_right" />
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EntityTypesEnum, IGroupInfo } from 'src/modules/courses/types/entity.types';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    group: {
      type: Object as PropType<IGroupInfo>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();

    function gotoGroup() {
      router.push({
        name: 'EntityTasks',
        params: {
          courseId: route.params.courseId,
          entityId: props.group.id,
        },
        query: {
          entityType: EntityTypesEnum.Group,
        },
      });
    }

    return {
      gotoGroup,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.group-card {
  border-radius: 10px;
  padding: 30px 70px 30px 30px;
  width: 100%;
  @include background-blur-opacity($main-bg, 0.1);

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
}
</style>
