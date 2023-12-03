<template>
  <div class="con-main-tab text-white flex justify-center items-center" :class="buttonClasses" @click="gotoRoute">
    <q-icon name="info" size="25px" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IRoute } from 'src/modules/core/types/route.types';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    routeParams: {
      type: Object as PropType<IRoute>,
      required: true,
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },

  setup(props) {
    const router = useRouter();

    const buttonClasses = computed(() => ({
      'con-main-tab--active': props.active,
    }));

    function gotoRoute() {
      router.push(props.routeParams);
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

.con-main-tab {
  min-width: 70px;
  width: 70px;
  height: 70px;
  border-radius: 10px;

  @include background-blur-opacity($secondary, 0.5);
  transition: 0.3s;

  &:hover {
    @include background-blur-opacity($secondary, 0.7);
    transition: 0.3s;
  }

  &--active {
    background-color: $secondary;
    transition: 0.3s;
  }
}
</style>
