<template>
  <div class="con-add-button text-white flex justify-center items-center" :class="buttonClasses" @click="gotoAddTasks">
    <q-icon size="25px" name="add_task" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    courseName: {
      type: String,
      default: () => undefined,
    },
    groupId: {
      type: String,
      default: () => undefined,
    },
    routeName: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const isActive = computed(() => route.name?.toString() === props.routeName);

    const buttonClasses = computed(() => ({
      'con-add-button--active': isActive.value,
    }));

    function gotoAddTasks() {
      router.push({
        name: props.routeName,
        params: {
          groupId: props.groupId,
        },
        query: {
          courseName: props.courseName,
        },
      });
    }

    return {
      buttonClasses,

      gotoAddTasks,
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
