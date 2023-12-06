<template>
  <div class="con-entity-button text-white flex justify-center items-center" :class="buttonClasses" @click="gotoRoute">
    <q-icon size="25px" :name="iconName" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ButtonIconNamesEnum } from 'components/ConAdminControls/controls.types';
import { AddEntityTypesEnum } from 'src/modules/courses/types/entity.types';

export default defineComponent({
  props: {
    courseId: {
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
          courseName: props.courseId,
        },
        query: {
          entityType: AddEntityTypesEnum.Student,
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
