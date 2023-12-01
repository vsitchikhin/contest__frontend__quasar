<template>
  <div class="con-dropdown">
    <div class="con-dropdown__main-block" @click="changeState">
      <slot name="main" />
    </div>
    <div class="con-dropdown__dropdown" :class="dropdownClasses">
      <div class="con-dropdown__dropdown-container">
        <slot name="opening" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    'update:modelValue': null,
  },

  setup(props, ctx) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: () => ctx.emit('update:modelValue', false),
    });

    const dropdownClasses = computed<Record<string, boolean>>(() => ({
      'con-dropdown__dropdown--open': isOpen.value,
    }));

    function changeState() {

      // isOpen.value = !isOpen.value;
    }

    return {
      dropdownClasses,
      changeState,
    };
  },
});
</script>

<style scoped lang="scss">
  @import 'src/css/app';

  .con-dropdown {
    border-radius: 10px;

    &__main-block {
      cursor: pointer;
    }

    &__dropdown {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s ease-in-out;
      overflow: hidden;

      &--open {
        grid-template-rows: 1fr;
        transition: grid-template-rows 0.4s ease-in-out;
        max-height: 900px;
        overflow: scroll;
      }
    }

    &__dropdown-container {
      min-height: 0;
    }
  }
</style>
