<template>
  <div class="con-dropdown">
    <div class="con-dropdown__main-block" :class="mainBlockClasses" :aria-disabled="disabled" @click="changeState">
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
    disabled: {
      type: Boolean,
      default: () => false,
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

    const mainBlockClasses = computed(() => ({
      'cursor-pointer': !props.disabled,
    }));

    function changeState() {
      // isOpen.value = !isOpen.value;
    }

    return {
      mainBlockClasses,
      dropdownClasses,

      changeState,
    };
  },
});
</script>

<style scoped lang="scss">
  @import 'src/css/app';

  .con-dropdown {
    border-radius: 20px;

    &__dropdown {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s ease-in-out;
      overflow: hidden;

      &--open {
        grid-template-rows: 1fr;
        transition: grid-template-rows 0.4s ease-in-out;
        max-height: 900px;
        overflow: auto;
      }
    }

    &__dropdown-container {
      min-height: 0;
    }
  }
</style>
