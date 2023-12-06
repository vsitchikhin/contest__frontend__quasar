<template>
  <div class="con-add-button text-white flex justify-center items-center" :class="buttonClasses" @click="gotoAddTasks">
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
    isAddStudent: {
      type: Boolean,
      default: () => false,
    },
    routeName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: () => false,
    },
    iconName: {
      type: String as PropType<ButtonIconNamesEnum>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const buttonClasses = computed(() => ({
      'con-add-button--active': props.active,
    }));

    function gotoRoute() {
      if (props.active) {
        return;
      }
      router.push({
        name: props.routeName,
        params: {
          courseId: props.courseId,
        },
        query: {
          entityType: props.isAddStudent ? EntityTypesEnum.Student : undefined,
        },
      });
    }

    return {
      buttonClasses,

      gotoAddTasks: gotoRoute,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-add-button {
  min-width: 70px;
  width: 70px;
  height: 70px;
  border-radius: 10px;

  @include background-blur-opacity($add-button, 0.5);
  transition: 0.3s;

  &:hover {
    @include background-blur-opacity($add-button, 0.7);
    transition: 0.3s;

  }

  &--active {
    background-color: $add-button;
    transition: 0.3s;
  }
}
</style>
