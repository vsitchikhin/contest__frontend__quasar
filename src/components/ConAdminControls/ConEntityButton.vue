<template>
  <div class="con-entity-button text-white flex justify-center items-center" :class="buttonClasses" @click="gotoRoute">
    <q-icon size="25px" :name="iconName" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';

export default defineComponent({
  props: {
    courseId: {
      type: String,
      default: () => undefined,
    },
    entityId: {
      type: String,
      default: () => undefined,
    },
    routeName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: () => false,
    },
    entityType: {
      type: String as PropType<EntityTypesEnum>,
      default: () => undefined,
    },
    iconName: {
      type: String as PropType<ButtonIconNamesEnum>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const buttonClasses = computed(() => ({
      'con-entity-button--active': props.active,
    }));

    function gotoRoute() {
      if (props.active) {
        return;
      }
      router.push({
        name: props.routeName,
        params: {
          courseId: props.courseId,
          entityId: props.entityId,
        },
        query: {
          entityType: props.entityType,
        },
      });
    }

    return {
      buttonClasses,

      gotoRoute,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-entity-button {
  min-width: 70px;
  width: 70px;
  height: 70px;
  border-radius: 10px;

  @include background-blur-opacity($back-button, 0.5);
  transition: 0.3s;

  &:hover {
    @include background-blur-opacity($back-button, 0.7);
    transition: 0.3s;

  }

  &--active {
    background-color: $back-button;
    transition: 0.3s;
  }
}
</style>
